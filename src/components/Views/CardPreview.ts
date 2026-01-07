import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";
import { IProduct, CategoryKey } from "../../types";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";

export type TCardPreview = Omit<IProduct, "id">;

export class CardPreview extends Card<TCardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, private events: IEvents) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);
    this.descriptionElement = ensureElement<HTMLElement>(".card__text", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

   this.buttonElement.addEventListener("click", () => {
      this.events.emit(AppEvent.CartToggleItem);
    })
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set description (value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText (value: string) {
    this.buttonElement.textContent = value || "В корзину";
    this.buttonElement.disabled = value === 'Недоступно';
  }
}