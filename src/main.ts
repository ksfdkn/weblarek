import { Api } from './components/base/Api';
import { Buyer } from './components/Models/Buyer';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import './scss/styles.scss';
import { isTPayment } from './types';
import { apiProducts } from './utils/data';

const catalog = new ProductCatalog();
const cart = new ShoppingCart();
const buyer = new Buyer(); 

const products = apiProducts.items;

catalog.setProducts(products);
const product = catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");

console.log("Массив товаров из каталога: ", catalog.getProducts());
console.log("Карточка товара:", product);

if (product !== undefined) {
  cart.addItem(product);
}

console.log("Корзина:", cart.getItems());
console.log("Стоимость всех товаров:", cart.getTotalPrice());

/*if (product !== undefined) {
  cart.removeItem(product);
}*/

console.log("Корзина:", cart.getItems());

const payment = "online";

if (isTPayment(payment)) {
  buyer.setPayment(payment);
}
buyer.setEmail("email");


console.log("Покупатель:", buyer.getData());

console.log("Валидация покупателя:", buyer.validate());

buyer.clear();
console.log("Валидация покупателя:", buyer.validate());