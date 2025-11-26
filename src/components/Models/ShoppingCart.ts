import { IProduct } from "../../types";

export class ShoppingCart {
  private items: IProduct[] = [];

  constructor() {
    this.items = [];
  }

  /**
   * Возвращает список товаров в корзине
   * @returns {IProduct[]} - список товаров в корзине
   */
  getItems(): IProduct[] {
    return this.items;
  }

  /**
   * Добавляет товар в корзину (если его ещё нет)
   * @param product {IProduct} - товар для добавления
   * @throws {Error} - если товар уже есть в корзине
   */
  addItem(product: IProduct): void {
    if (typeof product === "object" || product !== null) {
      this.items.push(product);
    } else {
      throw new Error("Параметр product должен быть объектом");
    }
  }

  /**
   * Удаляет товар из корзины по объекту
   * @param product {IProduct} - товар для удаления
   */
  removeItem(product: IProduct): void {
    const index = this.items.findIndex(item => item.id === product.id); //сильно ли съест память, если большая корзина?

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Очищает корзину (удаляет все товары)
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Возвращает суммарную стоимость всех товаров в корзине
   * @returns {number} суммарная стоимость всех товаров в корзине
   */
  getTotalPrice(): number {
    return this.items.reduce<number>((total: number, item) => {
      if(item.price !== null) {
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