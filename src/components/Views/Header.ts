import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";

interface THeader {
  counter: number;
}

/**
 * Компонент шапки приложения (header).
 * Отвечает за:
 * - отображение счётчика товаров в корзине;
 * - обработку клика по кнопке корзины и эмитацию события открытия корзины.
 */
export class Header extends Component<THeader> {
  /** Элемент отображения счётчика товаров в корзине (класс `.header__basket-counter`). */
  protected counterElement: HTMLElement;
  /** Кнопка корзины в шапке (класс `.header__basket`). */
  protected basketButton: HTMLButtonElement;

  /**
   * Создаёт экземпляр компонента шапки.
   *
   * @param container - корневой HTMLElement шапки.
   * @param events - экземпляр системы событий (`IEvents`) для отправки уведомлений.
   */
  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(".header__basket-counter", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>(".header__basket", this.container);

    this.basketButton.addEventListener("click", () => {
      this.events.emit(AppEvent.BasketOpened);
    });
  }

  /**
   * Сеттер для обновления значения счётчика товаров в корзине.
   *
   * @param value - числовое значение количества товаров.
   */
  set counter (value: number) {
    this.counterElement.textContent = String(value);
  }
}