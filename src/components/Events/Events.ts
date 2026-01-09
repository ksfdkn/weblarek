import { IProduct } from "../../types"

export enum AppEvent {
  CatalogProductsUpdated = "catalog:products:updated",
  CardSelected = "card:selected",
  ModalClosed = "modal:closed",
  PreviewChanged = "preview:changed",
  BasketOpened = "basket:opened",
  CartChanged = "cart:changed",
  CartToggleItem = "cart:toggleItem",
  BasketOrder = "basket:order",
  FormChanged = "form:changed",
  BuyerChanged = "buyer:changed",
  BuyerCleared = "buyer:cleared",
  OrderSubmitted = "order:submitted",
  ContactsSubmitted = "contacts:submitted",
  SuccessClosed = "success:closed",
}

export type AppEventMap = {
  [AppEvent.CatalogProductsUpdated]: IProduct[];
  [AppEvent.CardSelected]: IProduct;
  [AppEvent.ModalClosed]: {};
  [AppEvent.PreviewChanged]: {};
  [AppEvent.BasketOpened]: {};
  [AppEvent.CartChanged]: IProduct[];
  [AppEvent.CartToggleItem]: {};
  [AppEvent.BasketOrder]: {};
  [AppEvent.FormChanged]: {field: string; value: string};
  [AppEvent.BuyerChanged]: {};
  [AppEvent.BuyerCleared]: {};
  [AppEvent.OrderSubmitted]: {};
  [AppEvent.ContactsSubmitted]: {};
  [AppEvent.SuccessClosed]: {};
};