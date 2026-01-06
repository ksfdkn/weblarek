import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

/**
 * Класс ShoppingCart представляет модель данных корзины покупок
 */
export class ShoppingCart {
  private items: IProduct[] = [];

  constructor (private events: IEvents) {}

  /**
   * Возвращает список товаров в корзине
   * @returns {IProduct[]} - список товаров в корзине
   */
  getItems(): IProduct[] {
    return this.items;
  }

  /**
   * Добавляет товар в корзину
   * @param product {IProduct} - товар для добавления
   * @throws {Error} - если товар уже есть в корзине или не является объектом
   */
  addItem(product: IProduct): void {
    if (typeof product !== "object" || product === null) {
      throw new Error("Параметр product должен быть объектом");
    }

    if (this.hasItemById(product.id)) {
      throw new Error("Товар уже находится в корзине");
    }

    this.items.push(product);
    this.events.emit("cart:changed", this.items);
  }

  /**
   * Удаляет товар из корзины по его идентификатору (сравнивает по `id`)
   * @param product {IProduct} - товар для удаления
   */
  removeItem(product: IProduct): void {
    const index = this.items.findIndex(item => item.id === product.id);

    if (index !== -1) {
      this.items.splice(index, 1);
      this.events.emit("cart:changed", this.items);
    }
  }

  /**
   * Очищает корзину (удаляет все товары)
   */
  clear(): void {
    this.items = [];
    this.events.emit("cart:changed", this.items);
  }

  /**
   * Возвращает суммарную стоимость всех товаров в корзине
   * @returns {number} суммарная стоимость всех товаров в корзине
   */
  getTotalPrice(): number {
    return this.items.reduce<number>((total: number, item) => {
      if (item.price !== null) {
        return total + item.price;
      }
      return total;
    }, 0);
  }

  /**
   * Возвращает количество товаров в корзине
   * @returns {number} - количество товаров в корзине (длина массива `items`)
   */
  getItemCount(): number {
    return this.items.length;
  }

  /**
   * Проверяет наличие товара в корзине по id
   * @param id {string} - идентификатор товара
   * @returns {boolean} - `true`, если товар с таким `id` есть в корзине, иначе `false`
   */
  hasItemById(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}