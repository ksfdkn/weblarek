import { Buyer } from './components/base/Models/Buyer';
import { ProductCatalog } from './components/base/Models/ProductCatalog';
import { ShoppingCart } from './components/base/Models/ShoppingCart';
import './scss/styles.scss';
import { TPayment } from './types';

/*const catalog = new ProductCatalog();
catalog.setProducts([ 
  { id: '1', title: 'Товар', description: 'Описание', image: '/img.jpg', category: 'Категория', price: 100 },
  { id: '2', title: 'Товар', description: 'Описание', image: '/img.jpg', category: 'Категория', price: 100 },
  { id: '3', title: 'Товар', description: 'Описание', image: '/img.jpg', category: 'Категория', price: 100 },
]);
const product = catalog.getProductById("2");

console.log(catalog);
console.log(product);

const cart = new ShoppingCart();

if (product !== undefined) {
  cart.addItem(product);
}

console.log(cart);
console.log(cart.getTotalPrice());

if (product !== undefined) {
  cart.removeItem(product);
}

console.log(cart);

const buyer = new Buyer();  
const paymentStr = 'card';
const payment = 'card' as unknown as TPayment;

buyer.setPayment(payment);
buyer.setEmail("email");
buyer.setPhone("phone");
buyer.setAddress("address");

console.log(buyer.getData());

console.log(buyer.validate());

buyer.clear();
console.log(buyer.validate());*/