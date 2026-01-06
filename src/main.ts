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
//import { apiProducts } from './utils/data';

const api = new Api(API_URL);
const communicationApi = new CommunicationApi(api);
const events = new EventEmitter();
const productsModel = new ProductCatalog(events);
const cart = new ShoppingCart(events);
const buyer = new Buyer(events);

let products: IProduct[] = [];
let currentProduct: IProduct;

const gallery = new Gallery(document.querySelector("main.gallery")!);

const cardCatalogTemplate = document.getElementById("card-catalog") as HTMLTemplateElement;
const previewCardTemplate = document.getElementById("card-preview") as HTMLTemplateElement;
const cardBasketTemplate = document.getElementById("card-basket") as HTMLTemplateElement;
const basketTemplate = document.getElementById("basket") as HTMLTemplateElement;
const orderFormTemplate = document.getElementById("order") as HTMLTemplateElement;
const contactsFormTemplate = document.getElementById("contacts") as HTMLTemplateElement;
const successTemplate = document.getElementById("success") as HTMLTemplateElement;

if (!basketTemplate) {
  throw new Error('Шаблон корзины (#basket) не найден в DOM');
}

if (!cardCatalogTemplate) {
  throw new Error('Шаблон card-catalog не найден в DOM');
}

const modalContainer = document.getElementById("modal-container") as HTMLElement;
const headerBasketContainer = document.querySelector(".header__container") as HTMLElement;

const previewCloneTemplate = cloneTemplate(previewCardTemplate);
const basketCloneTemplate = cloneTemplate(basketTemplate);
const orderCloneTemplate = cloneTemplate(orderFormTemplate);
const contactsCloneTemplate = cloneTemplate(contactsFormTemplate);
const successCloneTemplate = cloneTemplate(successTemplate);

const header = new Header(headerBasketContainer, events);
const modal = new Modal(modalContainer, events);
const basket = new Basket(basketCloneTemplate, {
  onAddToCart: () => {
    events.emit('basket:order');
  }
});
const preview = new CardPreview(previewCloneTemplate, events);
const orderForm = new OrderForm(orderCloneTemplate, events);
const contactsForm = new ContactsForm(contactsCloneTemplate, events);
const success = new SuccessView(successCloneTemplate, events);

events.on('catalog:products:updated', (products: IProduct[]) => {
  const itemCards = products.map(item => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit("card:selected", item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards });
});

events.on("card:selected", (product: IProduct) => {
  currentProduct = product;

  preview.render({
    title: currentProduct.title,
    price: currentProduct.price,
    image: currentProduct.image,
    category: currentProduct.category,
    description: currentProduct.description,
  });

  const isInCart = cart.hasItemById(currentProduct.id);

  if (currentProduct.price === null) {
    preview.buttonText = "Недоступно";
  } else {
    preview.buttonText = isInCart ? "Удалить из корзины" : "Купить";
  }

  modal.open(previewCloneTemplate);
});

events.on("modal:closed", () => {
  modal.close();
});

events.on("basket:opened", () => {
  modal.open(basket.render());
});

events.on("cart:changed", (items: IProduct[]) => {
  if (!Array.isArray(items)) {
    console.error("cart:changed: items не является массивом", items);
    return;
  }

  basket.basketList = items.map((item, index) => {
    const card = new CardBasket(cloneTemplate(cardBasketTemplate),
      {
        onDelete: () => {
          cart.removeItem(item);
        }
      }
    );
    card.index = index;

    return card.render(item);
  });

  basket.basketPrice = cart.getTotalPrice();
  header.counter = cart.getItemCount();
});

events.on("cardPreview:basketAddDelete", () => {
  if (currentProduct) {
    const isInCart = cart.hasItemById(currentProduct.id);
    preview.buttonText = isInCart ? "Удалить из корзины" : "В корзину";

    if (isInCart) {
      cart.removeItem(currentProduct);
      preview.buttonText = "В корзину";
    } else {
      cart.addItem(currentProduct);
      preview.buttonText = "Удалить из корзины";
    }
  }

  console.log(cart.getItemCount());
  header.counter = cart.getItemCount();
});

events.on("basket:order", () => {
  if (cart.getItemCount() === 0) {
    return;
  }

  modal.clear();
  modal.open(orderForm.render());
});

events.on("form:change", (data: { field: string, value: string }) => {
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
});

events.on("buyer:changed", () => {
  const buyerData = buyer.getData();
  console.log("Данные покупателя:", buyerData);
  const validationErrors = buyer.validate();

  const orderFormData = {
    address: buyerData.address,
    payment: buyerData.payment,
    errors: [
      ...(validationErrors.address ? [validationErrors.address] : []),
      ...(validationErrors.payment ? [validationErrors.payment] : [])
    ].join("\n"),
    isValid: !validationErrors.address && !validationErrors.payment
  };

  console.log("Данные для render():", orderFormData);
  orderForm.render(orderFormData);

  if (orderFormData.payment === "online" || orderFormData.payment === "cash") {
    orderForm.paymentState = orderFormData.payment;
  }

  orderForm.isValid = orderFormData.isValid;

  const contactsFormData = {
    phone: buyerData.phone,
    email: buyerData.email,
    errors: [
      ...(validationErrors.phone ? [validationErrors.phone] : []),
      ...(validationErrors.email ? [validationErrors.email] : [])
    ].join("\n"),
    isValid: !validationErrors.phone && !validationErrors.email
  };
  console.log("Данные для ContactsForm.render():", contactsFormData);
  contactsForm.render(contactsFormData);
  contactsForm.isValid = contactsFormData.isValid;
});

events.on("order:submit", () => {
  modal.clear();
  modal.open(contactsForm.render());
});

events.on("contacts:submit", () => {
  const buyerData = buyer.getData();
  const validationErrors = buyer.validate();

  if (validationErrors.address || validationErrors.email || validationErrors.payment || validationErrors.phone) {
    console.warn(`Есть ошибки валидации: ${validationErrors}`);
    return;
  }

  const orderData: IOrderRequest = {
    ...buyerData,
    total: cart.getTotalPrice(),
    items: cart.getItems().map(item =>item.id),
  }

  communicationApi.sendOrder(orderData).then((response: IOrderResponse) => {
    const total = response.total;
    success.total = total;

    modal.clear();
    modal.open(success.render());
    cart.clear();
    events.emit("cart:changed");

    buyer.clear();
  }).catch((error) => {
    console.error("Ошибка при отправке заказа:", error);
  });
});

events.on("success:close", () => {
  modal.close();
});

try {
  products = await communicationApi.getProducts();

  const processedProducts = products.map(product => ({
    ...product,
    image: `${CDN_URL + product.image}`
  }));

  productsModel.setProducts(processedProducts);
  events.emit('catalog:changed');
} catch (error) {
  console.error("Ошибка при загрузке товаров:", error);
}

//const products = apiProducts.items;

//catalog.setProducts(products);
//console.log("Массив товаров из каталога (setProducts и getProducts): ", catalog.getProducts());



/*
const product = catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Карточка товара (getProductById):", catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

if (product) {
  catalog.setSelectedProduct(product);
  console.log("Карточка товара для детального просмотра (setSelectedProduct и getSelectedProduct):", catalog.getSelectedProduct());
}

console.log("--- --- --- --- --- --- --- --- --- --- --- --- --- ---");

if (product) {
  console.log("Добавили товар в корзину (addItem)")
  cart.addItem(product);
  //cart.addItem(product);
}

console.log("Корзина (getItems):", cart.getItems());
console.log("Стоимость всех товаров (getTotalPrice):", cart.getTotalPrice());

/*if (product !== undefined) {
  cart.removeItem(product);
  console.log("Корзина:", cart.getItems());
}

console.log("Количество товаров в корзине (getItemCount): ", cart.getItemCount());
console.log("Проверить наличие товара (hasItemById): ", cart.hasItemById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));

cart.clear();
console.log("Очистили корзину (clear и getItems): ", cart.getItems());

console.log("--- --- --- --- --- --- --- --- --- --- --- --- --- ---");

const payment = "online";

if (isTPayment(payment)) {
  buyer.setPayment(payment);
}
buyer.setEmail("email");


console.log("Покупатель (setPayment, setEmail, getData):", buyer.getData());
console.log("Валидация покупателя (validate):", buyer.validate());

buyer.clear();
console.log("Удалили покупателя (clear)");
console.log("Валидация покупателя: (validate)", buyer.validate());
*/