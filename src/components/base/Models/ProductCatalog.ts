import { IProduct } from "../../../types";

export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor() {
    this.products = [];
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    if(Array.isArray(products)) {
      this.products = products
    } else {
      throw new Error("Параметр products должен быть массивом");
    }
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  setSelectedProduct(product: IProduct): void {
    if(typeof product === 'object' || product !== null) {
      this.selectedProduct = product;
    } else {
      throw new Error("Параметр product должен быть обьектом");
    }
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}