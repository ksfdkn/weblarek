import { Card, TCardData } from "./Card";
import { ensureElement } from "../../utils/utils";
import { ICardActions } from "../../types";

export type TCardBasket = TCardData;

export class CardBasket extends Card<TCardBasket> {
  protected basketItemIndexElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor (container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.basketItemIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

    if (actions?.onDelete) {
      this.buttonElement.addEventListener("click", actions.onDelete);
    }
  }

  set index (value: number) {
    this.basketItemIndexElement.textContent = String(value + 1);
  }

  set title (value: string) {
    this.titleElement.textContent = value;
  }

  set price (value: number | null) {
    if (this.priceElement) {
      this.priceElement.textContent = `${value} синапсов` 
    }
  }
}