import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ICardActions } from "../../types";

interface IBasket {
  basketList: HTMLElement[];
  basketPrice: string;
}

export class Basket extends Component<IBasket> {
  protected basketListElement: HTMLElement;
  protected basketPriceElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.basketListElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.basketPriceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );

    if (actions?.onAddToCart) {
      this.basketButton.addEventListener("click", actions.onAddToCart);
    }
  }

  set basketList(content: HTMLElement[]) {
    this.basketListElement.innerHTML = "";
    content.forEach((item) => {
      this.basketListElement.appendChild(item);
    });
  }

  set basketPrice(value: number | null) {
    if (this.basketPriceElement) {
      this.basketPriceElement.textContent =
        value !== null ? `${value} синапсов` : "0 синапсов";
    }
  }

  render(): HTMLElement {
    return this.container;
  }
}
