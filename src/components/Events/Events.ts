import { IProduct } from "../../types"

export enum AppEvent {
  CatalogProductsUpdated = "catalog:products:updated",
  CardSelected = "card:selected",
  ModalClose = "modal:closed",
  BasketOpened = "basket:opened",
  CartChanged = "cart:changed",
  CartToggleItem = "cart:toggleItem",
  BasketOrder = "basket:order",
  FormChanged = "form:changed",
  BuyerChanged = "buyer:changed",
  OrderSubmitted = "order:submitted",
  ContactsSubmitted = "contacts:submitted",
  SuccessClosed = "success:closed",
}

export type AppEventMap = {
  [AppEvent.CatalogProductsUpdated]: IProduct[];
  [AppEvent.CardSelected]: IProduct;
  [AppEvent.ModalClose]: void;
  [AppEvent.BasketOpened]: void;
  [AppEvent.CartChanged]: IProduct[];
  [AppEvent.CartToggleItem]: void;
  [AppEvent.BasketOrder]: void;
  [AppEvent.FormChanged]: {field: string; value: string};
  [AppEvent.BuyerChanged]: void;
  [AppEvent.OrderSubmitted]: void;
  [AppEvent.ContactsSubmitted]: void;
  [AppEvent.SuccessClosed]: void;
};