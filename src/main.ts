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
console.log("Массив товаров из каталога: ", catalog.getProducts());

const product = catalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log("Карточка товара:", product);

if (product) {
  cart.addItem(product);
  
  console.log("Корзина:", cart.getItems());
  console.log("Стоимость всех товаров:", cart.getTotalPrice());
} else {
  console.log("Карточка товара не найдена")
}

/*if (product !== undefined) {
  cart.removeItem(product);
  console.log("Корзина:", cart.getItems());
}*/

const payment = "online";

if (isTPayment(payment)) {
  buyer.setPayment(payment);
}
buyer.setEmail("email");


console.log("Покупатель:", buyer.getData());
console.log("Валидация покупателя:", buyer.validate());

buyer.clear();
console.log("Удалили покупателя");
console.log("Валидация покупателя:", buyer.validate());