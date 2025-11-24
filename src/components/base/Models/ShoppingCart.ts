import { IProduct } from "../../../types";

export class ShoppingCart {
  private items: IProduct[] = [];

  constructor() {
    this.items = [];
  }

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(product: IProduct): void {
    if (typeof product === "object" || product !== null) {
      this.items.push(product);
    } else {
      throw new Error("Параметр product должен быть объектом");
    }
  }

  removeItem(product: IProduct): void {
    const index = this.items.findIndex(item => item.id === product.id); //сильно ли съест память, если большая корзина?

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce<number>((total: number, item) => {
      if(item.price !== null) {
        return total + item.price;
      }
      return total;
    }, 0);
  }

  getItemCount(): number {
    return this.items.length;
  }

  hasItemById(id: string): boolean {
    return this.items.some(item => item.id === id);
  }
}