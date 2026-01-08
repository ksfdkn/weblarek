import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ICardActions, IBasket } from "../../types";

/**
 * Компонент корзины покупок.
 * Отвечает за отображение списка товаров, итоговой цены и кнопки оформления заказа.
 */
export class Basket extends Component<IBasket> {
  /**  Контейнер для списка товаров в корзине (элемент с классом `.basket__list`). */
  protected basketListElement: HTMLElement;
  /** Элемент отображения итоговой цены (класс `.basket__price`). */
  protected basketPriceElement: HTMLElement;
  /** Кнопка оформления заказа (класс `.basket__button`). */
  protected basketButton: HTMLButtonElement;

  /**
   * Создаёт экземпляр компонента корзины.
   *
   * @param container - корневой HTMLElement корзины.
   * @param actions - объект с действиями (опционально), содержит колбэк `onAddToCart`.
   */
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

  /**
   * Сеттер для обновления списка товаров в корзине.
   *
   * @param content - массив HTMLElement, представляющих товары в корзине.
   */
  set basketList(content: HTMLElement[]) {
    this.basketListElement.innerHTML = "";
    content.forEach((item) => {
      this.basketListElement.appendChild(item);
    });
  }

  
  /**
   * Сеттер для обновления отображаемой цены.
   *
   * @param value - числовая стоимость корзины или `null`.
   */
  set basketPrice(value: number | null) {
    if (this.basketPriceElement) {
      this.basketPriceElement.textContent =
        value !== null ? `${value} синапсов` : "0 синапсов";
    }
  }

  /**
   * Сеттер для управления состоянием кнопки оформления заказа.
   *
   * @param value - `true` для активации кнопки, `false` для блокировки.
   */
  set basketButtonEnabled (value: boolean) {
    this.basketButton.disabled = !value;
  }
}
