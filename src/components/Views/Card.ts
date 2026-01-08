import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";

export type TCardData = Pick<IProduct, 'title' | "price">;

/**
 * Базовый класс для карточек товара (каталог, корзина, превью).
 * Содержит общую логику работы с заголовком и ценой.
 *
 * @template T - тип данных карточки (должен расширять TCardData)
 */
export abstract class Card<T extends TCardData> extends Component<T> {
  /** Элемент с названием товара */
  protected titleElement: HTMLElement;
  /** Элемент с ценой товара (может отсутствовать) */
  protected priceElement: HTMLElement | null = null;

  /**
   * Создаёт карточку товара.
   * @param container - HTMLElement карточки
   */
  constructor (container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
  }

  /**
   * Устанавливает заголовок карточки.
   * @param value - текст заголовка
   */
  set title (value: string) {
    this.titleElement.textContent = value;
  }

  /**
   * Устанавливает цену карточки.
   * @param value - числовая цена или null
   */
  set price (value: number | null) {
    if (this.priceElement) {
      this.priceElement.textContent = value !== null
        ? `${value} синапсов`
        : "Бесценно"
    }
  }
}