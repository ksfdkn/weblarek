import { IApi } from "../../types";
import { Api } from "../base/Api";

export class CommunicationApi {
  private api: IApi;

  constructor() {
    this.api = this.initApi();
  }

  private initApi(): IApi {
    const baseUrl = import.meta.env.VITE_API_ORIGIN;

    if (!baseUrl) {
      throw new Error("VITE_API_ORIGIN не задан в .env");
    }

    return new Api(baseUrl);
  }
}