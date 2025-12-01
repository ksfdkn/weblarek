import { IProduct } from "../../types";

/**
 * Класс ProductCatalog представляет модель данных каталога товаров
 */
export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  /**
   * Заменяет текущий каталог на переданный массив
   * @param products {IProduct[]} - массив товаров для сохранения
   * @throws {Error} - если `products` не массив
   */
  setProducts(products: IProduct[]): void {
    if (Array.isArray(products)) {
      this.products = products
    } else {
      throw new Error("Параметр products должен быть массивом");
    }
  }

  /**
   * Возвращает текущий массив товаров
   * @returns {IProduct[]} - текущий массив товаров
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Ищет по индетификатору товара
   * @param id {string} - идентификатор товара.
   * @returns {IProduct | undefined} - товар с указанным `id` или `undefined`, если не найден
   */
  getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Сохраняет товар как выбранный для детального просмотра
   * @param product {IProduct} - товар для отображения
   * @throws {Error} - `product` не `IProduct`
   */
  setSelectedProduct(product: IProduct): void {
    if (typeof product === 'object' || product !== null) {
      this.selectedProduct = product;
    } else {
      throw new Error("Параметр product должен быть обьектом");
    }
  }

  /**
   * Возвращает выбранный товар для детального просмотра
   * @returns {IProduct | null}- выбранный товар или `null`, если ничего не выбрано
   */
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}