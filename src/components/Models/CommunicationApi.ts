import { IApi, IProduct, IProductsResponce, IRequest, IResponse } from "../../types";
import { API_URL } from "../../utils/constants";
import { Api } from "../base/Api";

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
   * Конструктор класса инициализирует API-клиент через метод `initApi()`
   */
  constructor() {
    this.api = this.initApi();
  }

  /**
   * Инициализует API-клиент на основе `API_URL`
   * @returns {IApi} - экземпляр API-клиента
   * @throws {Error} - `API_URL` не задан в константах
   */
  private initApi(): IApi {
    const baseUrl = API_URL;

    if (!baseUrl) {
      throw new Error("API_URL не задан в константах");
    }

    return new Api(baseUrl);
  }

  /**
   * Выполняет GET‑запрос к `/product/` и возвращает массив товаров `IProduct[]`
   * @returns {Promise<IProduct[]>} - массив товаров `IProduct[]`
   * @throws {Error} - ошибка при загрузке товаров
   */
  async getProducts(): Promise<IProduct[]> {
    try {
      const response = await this.api.get<IProductsResponce>("/product/");
      return response.items;
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
      throw error;
    }
  }

  //в теории очень сухо говорится об этом методе. просто передать данные
  /**
   * Выполняет POST‑запрос к `/order/` с данными заказа `order: IRequest`
   * @param order {IRequest} - данные заказа
   * @returns {Promise<IResponse>} - подтверждение от сервера `{id, total}`
   */
  async sendOrder(order: IRequest): Promise<IResponse> {
    try {
      return await this.api.post<IResponse>("/order/", order)
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      throw error;
    }
  }
}