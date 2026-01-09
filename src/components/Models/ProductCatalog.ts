import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";

/**
 * Класс ProductCatalog представляет модель данных каталога товаров
 */
export class ProductCatalog {
  private products: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  constructor(private events: IEvents) {}

  /**
   * Заменяет текущий каталог на переданный массив
   * @param products {IProduct[]} - массив товаров для сохранения
   */
  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit(AppEvent.CatalogProductsUpdated, this.products);
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
      this.selectedProduct = product;
      this.events.emit(AppEvent.PreviewChanged);
  }

  /**
   * Возвращает выбранный товар для детального просмотра
   * @returns {IProduct | null}- выбранный товар или `null`, если ничего не выбрано
   */
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}