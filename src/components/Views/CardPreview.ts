import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";
import { IProduct, CategoryKey } from "../../types";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";

export type TCardPreview = Omit<IProduct, "id">;

/**
 * Компонент карточки-превью товара.
 * Отображает расширенную информацию о товаре (изображение, категорию, описание, кнопку действия)
 * в модальном окне. Обеспечивает обработку клика по кнопке.
 */
export class CardPreview extends Card<TCardPreview> {
  /** Элемент изображения товара (класс `.card__image`). */
  protected imageElement: HTMLImageElement;
  /** Элемент отображения категории товара (класс `.card__category`). */
  protected categoryElement: HTMLElement;
  /** Элемент для текстового описания товара (класс `.card__text`). */
  protected descriptionElement: HTMLElement;
  /** Кнопка действия на карточке (класс `.card__button`). */
  protected buttonElement: HTMLButtonElement;

  /**
   * Создаёт экземпляр карточки-превью.
   *
   * @param container - корневой HTMLElement карточки.
   * @param events - экземпляр системы событий (`IEvents`) для отправки уведомлений.
   */
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

  /**
   * Сеттер для установки изображения товара.
   *
   * @param value - URL изображения.
   */
  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  /**
   * Сеттер для установки категории товара.
   *
   * @param value - строка с названием категории.
   */
  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  /**
   * Сеттер для установки описания товара.
   *
   * @param value - строка с описанием товара.
   */
  set description (value: string) {
    this.descriptionElement.textContent = value;
  }

  /**
   * Сеттер для управления текстом и состоянием кнопки действия.
   *
   * @param value - текст для кнопки.
   */
  set buttonText (value: string) {
    this.buttonElement.textContent = value || "В корзину";
    this.buttonElement.disabled = value === 'Недоступно';
  }
}