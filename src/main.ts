import { Buyer } from './components/Models/Buyer';
import { CommunicationApi } from './components/Models/CommunicationApi';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import './scss/styles.scss';
import { IProduct, isTPayment } from './types';
//import { apiProducts } from './utils/data';

const api = new CommunicationApi();
const catalog = new ProductCatalog();
const cart = new ShoppingCart();
const buyer = new Buyer();
let products: IProduct[] = [];
//const products = apiProducts.items;

try {
  products = await api.getProducts();
} catch (error) {
  console.error("Ошибка при загрузке товаров:", error);
}

catalog.setProducts(products);
console.log("Массив товаров из каталога (setProducts и getProducts): ", catalog.getProducts());

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
}*/

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