import { IApi, IProduct, IProductsResponse, IOrderRequest, IOrderResponse } from "../../types";

/**
 * Класс CommunicationApi — коммуникационный слой приложения
 * Отвечает за взаимодействие с API. Делегирует HTTP-запрос экземпляру IApi
 * Основные методы:
 * - загрузка товаров (GET /product/)
 * - отправка данных заказа (POST /order/)
 */
export class CommunicationApi {
  private api: IApi;

  /**
   * Конструктор класса принимает инициализированный API‑клиент
   */
  constructor(api: IApi) {
    this.api = api;
  }

  /**
   * Выполняет GET‑запрос к `/product/` и возвращает массив товаров `IProduct[]`
   * @returns {Promise<IProduct[]>} - массив товаров `IProduct[]`
   * @throws {Error} - ошибка при загрузке товаров
   */
  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await this.api.get<IProductsResponse>("/product/");
      return response.items;
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      throw error;
    }
  }

  /**
   * Выполняет POST‑запрос к `/order/` с данными заказа `order: IOrderRequest`
   * @param order {IOrderRequest} - данные заказа
   * @returns {Promise<IOrderResponse>} - подтверждение от сервера `{id, total}`
   */
  async sendOrder(order: IOrderRequest): Promise<IOrderResponse> {
    try {
      return await this.api.post<IOrderResponse>("/order/", order)
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      throw error;
    }
  }
}