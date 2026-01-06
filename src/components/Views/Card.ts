import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";

export type TCardData = Pick<IProduct, 'title' | "price">;

export abstract class Card<T extends TCardData> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement | null = null;

  constructor (container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set title (value: string) {
    this.titleElement.textContent = value;
  }

  set price (value: number | null) {
    if (this.priceElement) {
      this.priceElement.textContent = value !== null
        ? `${value} синапсов`
        : "Бесценно"
    }
  }
}