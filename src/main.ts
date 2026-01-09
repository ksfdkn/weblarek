import { Api } from './components/base/Api';
import { Buyer } from './components/Models/Buyer';
import { CommunicationApi } from './components/Models/CommunicationApi';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import './scss/styles.scss';
import { IOrderRequest, IProduct, IOrderResponse } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { Gallery } from './components/Views/Gallery';
import { CardCatalog } from './components/Views/CardCatalog';
import { cloneTemplate } from './utils/utils';
import { CardPreview } from './components/Views/CardPreview';
import { Modal } from './components/Views/Modal';
import { Header } from './components/Views/Header';
import { Basket } from './components/Views/Basket';
import { CardBasket } from './components/Views/CardBasket';
import { OrderForm } from './components/Views/OrderForm';
import { ContactsForm } from './components/Views/ContactsForm';
import { SuccessView } from './components/Views/SuccessView';
import { AppEvent, AppEventMap } from './components/Events/Events';

const api = new Api(API_URL);
const communicationApi = new CommunicationApi(api);
const events = new EventEmitter();

/** Модели данных. */
const productsModel = new ProductCatalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);

/** Представления. */
let gallery: Gallery | null = null;
let header: Header | null = null;
let modal: Modal | null = null;
let basket: Basket | null = null;
let preview: CardPreview | null = null;
let orderForm: OrderForm | null = null;
let contactsForm: ContactsForm | null = null;
let success: SuccessView | null = null;

/** Шаблоны. */
let cardCatalogTemplate: HTMLTemplateElement | null = null;
let previewCardTemplate: HTMLTemplateElement | null = null;
let cardBasketTemplate: HTMLTemplateElement | null = null;
let basketTemplate: HTMLTemplateElement | null = null;
let orderFormTemplate: HTMLTemplateElement | null = null;
let contactsFormTemplate: HTMLTemplateElement | null = null;
let successTemplate: HTMLTemplateElement | null = null;


/**
 * Инициализирует приложение: загружает шаблоны, настраивает компоненты,
 * подписывается на события и загружает товары.
 */
function init() {
  cardCatalogTemplate = document.getElementById("card-catalog") as HTMLTemplateElement;
  previewCardTemplate = document.getElementById("card-preview") as HTMLTemplateElement;
  cardBasketTemplate = document.getElementById("card-basket") as HTMLTemplateElement;
  basketTemplate = document.getElementById("basket") as HTMLTemplateElement;
  orderFormTemplate = document.getElementById("order") as HTMLTemplateElement;
  contactsFormTemplate = document.getElementById("contacts") as HTMLTemplateElement;
  successTemplate = document.getElementById("success") as HTMLTemplateElement;

  if (!cardCatalogTemplate) throw new Error('Шаблон #basket не найден в DOM');
  if (!previewCardTemplate) throw new Error('Шаблон #card-preview  не найден в DOM');
  if (!cardBasketTemplate) throw new Error('Шаблон #card-basket не найден в DOM');
  if (!basketTemplate) throw new Error('Шаблон #basket не найден в DOM');
  if (!orderFormTemplate) throw new Error('Шаблон #order не найден в DOM');
  if (!contactsFormTemplate) throw new Error('Шаблон #contacts не найден в DOM');
  if (!successTemplate) throw new Error('Шаблон #success не найден в DOM');

  const galleryContainer = document.querySelector("main.gallery") as HTMLElement;
  const modalContainer = document.getElementById("modal-container") as HTMLElement;
  const headerBasketContainer = document.querySelector(".header__container") as HTMLElement;

  if (!galleryContainer) throw new Error('Контейнер main.gallery не найден в DOM');
  if (!modalContainer) throw new Error('Контейнер .modal-container  не найден в DOM');
  if (!headerBasketContainer) throw new Error('Контейнер .header__container не найден в DOM');

  gallery = new Gallery(galleryContainer!);
  header = new Header(headerBasketContainer!, events);
  modal = new Modal(modalContainer!, events);

  basket = new Basket(cloneTemplate(basketTemplate!), {
    onAddToCart: () => events.emit(AppEvent.BasketOrder)
  });

  preview = new CardPreview(cloneTemplate(previewCardTemplate!), events);
  orderForm = new OrderForm(cloneTemplate(orderFormTemplate!), events);
  contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate!), events);
  success = new SuccessView(cloneTemplate(successTemplate!), events);

  setupEventListeners();
  loadProducts();
}

/**
 * Подписывается на события приложения и связывает их с обработчиками.
 */
function setupEventListeners() {
  events.on<AppEventMap[AppEvent.CatalogProductsUpdated]>(
    AppEvent.CatalogProductsUpdated,
    renderCatalog
  );

  events.on<AppEventMap[AppEvent.CardSelected]>(
    AppEvent.CardSelected,
    handleCardSelect
  );

  events.on<{}>(AppEvent.ModalClosed, () => modal?.close());

  events.on<{}>(AppEvent.PreviewChanged, handlePreviewChanged);

  events.on<{}>(AppEvent.BasketOpened, () => {
    if (!modal || !basket) {
      console.error("Modal или Basket не инициализированы");
      return;
    }

    const basketElement = basket.render();
    if (!basketElement) {
      console.error("Basket.render() вернул null/undefined");
      return;
    }

    modal.open(basketElement);
  });

  events.on<AppEventMap[AppEvent.CartChanged]>(
    AppEvent.CartChanged,
    renderCart
  );

  events.on<{}>(AppEvent.CartToggleItem, handleCartToggle);

  events.on<{}>(AppEvent.BasketOrder, handleOrderStart);

  events.on<AppEventMap[AppEvent.FormChanged]>(
    AppEvent.FormChanged,
    handleFormChange
  );

  events.on<{}>(AppEvent.BuyerChanged, renderForms);

  events.on<{}>(AppEvent.BuyerCleared, resetForms);

  events.on<{}>(AppEvent.OrderSubmitted, () => {
    if (!modal) {
      console.error("Modal не инициализирован");
      return;
    }

    if (!contactsForm) {
      console.error("ContactsForm не инициализирован");
      return;
    }

    const formElement = contactsForm.render();
    if (!formElement) {
      console.error("ContactsForm.render() вернул null/undefined");
      return;
    }

    modal.clear();
    modal.open(formElement);
  });

  events.on<{}>(AppEvent.ContactsSubmitted, handleOrderSubmit);

  events.on<{}>(AppEvent.SuccessClosed, () => modal?.close());
}

/**
 * Асинхронно загружает список товаров из API,
 * обрабатывает изображения и передаёт данные в модель каталога.
 */
async function loadProducts() {
  try {
    const products = await communicationApi.getProducts();

    const processedProducts = products.map(product => ({
      ...product,
      image: `${CDN_URL + product.image}`
    }));

    productsModel.setProducts(processedProducts);
    events.emit(AppEvent.CatalogProductsUpdated, processedProducts);
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
  }
}

/**
 * Отрисовывает каталог товаров на основе переданных данных.
 * @param products - массив товаров для отображения
 */
function renderCatalog(products: IProduct[]) {
  if (!gallery || !cardCatalogTemplate) return;

  const template: HTMLTemplateElement = cardCatalogTemplate;

  const itemCards = products.map(item => {
    const card = new CardCatalog(cloneTemplate(template), {
      onClick: () => events.emit(AppEvent.CardSelected, item),
    });
    return card.render(item);
  });

  gallery.render({ catalog: itemCards });
}

/**
 * Обрабатывает выбор товара пользователем:
 * - сохраняет выбранный товар в `Model`;
 * @param product - выбранный товар
 */
function handleCardSelect(product: IProduct) {
  productsModel.setSelectedProduct(product);
}

function handlePreviewChanged() {
  const selectedProduct = productsModel.getSelectedProduct();

  if(!selectedProduct || !preview || !modal) return;

  preview.render({
    title: selectedProduct.title,
    price: selectedProduct.price,
    image: selectedProduct.image,
    category: selectedProduct.category,
    description: selectedProduct.description,
  });

  const isInCart = cart.hasItemById(selectedProduct.id);

  if(selectedProduct.price === null) {
    preview.buttonText = "Недоступно";
  } else {
    preview.buttonText = isInCart? "Удалить из корзины" : "Купить";
  }

  modal.open(preview.render());
}

/**
 * Обрабатывает переключение состояния товара в корзине (добавить/удалить).
 * Обновляет счётчик в шапке и закрывает модальное окно.
 */
function handleCartToggle() {
  const selectedProduct = productsModel.getSelectedProduct();
  if (!selectedProduct || !header || !modal) return;

  const isInCart = cart.hasItemById(selectedProduct.id);
  if (isInCart) {
    cart.removeItem(selectedProduct);
  } else {
    cart.addItem(selectedProduct);
  }

  header.counter = cart.getItemCount();

  modal.close();
}

/**
 * Начинает процесс оформления заказа:
 * - очищает модальное окно;
 * - открывает форму оформления заказа.
 */
function handleOrderStart() {
  if (!basket || !modal || cart.getItemCount() === 0) return;

  modal.clear();
  modal.open(orderForm!.render());
}

/**
 * Отрисовывает корзину с товарами:
 * - создаёт карточки товаров в корзине;
 * - обновляет итоговую сумму и счётчик в шапке;
 * - управляет активностью кнопки оформления заказа.
 * @param items - массив товаров в корзине
 */
function renderCart(items: IProduct[]) {
  if (!basket || !cardBasketTemplate || !header) {
    console.warn("basket, cardBasketTemplate или header не инициализированы");
    return;
  }

  const template = cardBasketTemplate;

  basket.basketList = items.map((item, index) => {
    const card = new CardBasket(cloneTemplate(template), {
      onDelete: () => cart.removeItem(item)
    });
    card.index = index;
    return card.render(item);
  });

  basket.basketPrice = cart.getTotalPrice();
  header.counter = cart.getItemCount();
  basket.basketButtonEnabled = cart.getItemCount() > 0;
}

/**
 * Обрабатывает изменение полей форм (адрес, способ оплаты, телефон, email).
 * Передаёт данные в модель покупателя.
 * @param data - объект с полями `field` (имя поля) и `value` (значение)
 */
function handleFormChange(data: { field: string; value: string }) {
  switch (data.field) {
    case "address":
      buyer.setAddress(data.value);
      break;

    case "payment":
      buyer.setPayment(data.value as "online" | "cash");
      break;

    case "phone":
      buyer.setPhone(data.value);
      break;

    case "email":
      buyer.setEmail(data.value);
      break;

    default:
      console.warn(`Неизвестное поле формы: ${data.field}`);
      break;
  }
}

/**
 * Отрисовывает формы оформления заказа и контактных данных
 * с актуальными данными покупателя и сообщениями об ошибках валидации.
 */
function renderForms() {
  if (!orderForm || !contactsForm) return;
  const buyerData = buyer.getData();
  const validationErrors = buyer.validate();

  orderForm.render({
    address: buyerData.address,
    payment: buyerData.payment,
    errors: [
      ...(validationErrors.address ? [validationErrors.address] : []),
      ...(validationErrors.payment ? [validationErrors.payment] : [])
    ].join("\n"),
    isValid: !validationErrors.address && !validationErrors.payment
  });

  if (buyerData.payment) {
    orderForm.paymentState = buyerData.payment;
  }
  
  contactsForm.render({
    phone: buyerData.phone,
    email: buyerData.email,
    errors: [
      ...(validationErrors.phone ? [validationErrors.phone] : []),
      ...(validationErrors.email ? [validationErrors.email] : [])
    ].join("\n"),
    isValid: !validationErrors.phone && !validationErrors.email
  });
}

/**
 * Очищает формы оформления заказа и контактных данных,
 * сбрасывает состояние модели покупателя.
 */
function resetForms() {
  orderForm?.render({
    address: "",
    payment: "",
    errors: "",
    isValid: false,
  });

  contactsForm?.render({
    phone: "",
    email: "",
    errors: "",
    isValid: false,
  });

  if (orderForm) {
    orderForm.paymentState = "";
  }
}

/**
 * Обрабатывает отправку заказа:
 * - проверяет валидность данных покупателя;
 * - формирует объект заказа;
 * - отправляет заказ через API;
 * - отображает экран успеха или ошибки.
 */
function handleOrderSubmit() {
  if (!buyer || !communicationApi || !success || !modal) {
    console.error("Не все компоненты инициализированы: buyer, communicationApi, success или modal отсутствует");
    return;
  }

  const currentSuccess = success;
  const currentModal = modal;

  const buyerData = buyer.getData();
  const validationErrors = buyer.validate();

  if (Object.keys(validationErrors).length > 0) {
    console.warn("Ошибки валидации:", validationErrors);
    return;
  }

  const orderData: IOrderRequest = {
    ...buyerData,
    total: cart.getTotalPrice(),
    items: cart.getItems().map(item => item.id),
  };

  communicationApi.sendOrder(orderData)
    .then((response: IOrderResponse) => {
      currentSuccess.total = response.total;
      currentModal.clear();
      currentModal.open(currentSuccess.render());
      cart.clear();
      buyer.clear();
      events.emit(AppEvent.BuyerCleared);
    })
    .catch((error) => {
      console.error("Ошибка при отправке заказа:", error);
    });
}

init();