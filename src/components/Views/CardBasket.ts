import { Card, TCardData } from "./Card";
import { ensureElement } from "../../utils/utils";
import { ICardActions } from "../../types";

export type TCardBasket = TCardData;

/**
 * Компонент карточки товара в корзине.
 * Отображает информацию о товаре внутри корзины и кнопку удаления.
 */
export class CardBasket extends Card<TCardBasket> {
  /** Элемент отображения индекса товара в корзине (класс `.basket__item-index`). */
  protected basketItemIndexElement: HTMLElement;
  
  /** Кнопка добавления/удаления на карточке (класс `.card__button`). */
  protected buttonElement: HTMLButtonElement;

  /**
   * Создаёт экземпляр карточки товара для корзины.
   *
   * @param container - корневой HTMLElement карточки.
   * @param actions - объект с действиями (опционально), содержит колбэк `onDelete`.
   */
  constructor (container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.basketItemIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".card__button", this.container);

    if (actions?.onDelete) {
      this.buttonElement.addEventListener("click", actions.onDelete);
    }
  }

  /**
   * Сеттер для установки индекса товара в корзине.
   *
   * @param value - числовой индекс товара в списке.
   */
  set index (value: number) {
    this.basketItemIndexElement.textContent = String(value + 1);
  }

   /**
   * Сеттер для обновления названия товара.
   *
   * @param value - строка с названием товара.
   */
  set title (value: string) {
    this.titleElement.textContent = value;
  }

  /**
   * Сеттер для обновления цены товара.
   *
   * @param value - числовая цена или `null`.
   */
  set price (value: number | null) {
    if (this.priceElement) {
      this.priceElement.textContent = `${value} синапсов` 
    }
  }
}