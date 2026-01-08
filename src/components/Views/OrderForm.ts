import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { BaseForm } from "./BaseForm";
import { AppEvent } from "../Events/Events";
import { IOrderForm } from "../../types";

/**
 * Форма оформления заказа.
 * Отвечает за отображение поля адреса и кнопок способа оплаты, валидацию.
 */
export class OrderForm extends BaseForm<IOrderForm> {
  /** Поле ввода адреса */
  protected addressInputElement: HTMLInputElement;
  /** Кнопка выбора оплаты картой */
  protected cardButton: HTMLButtonElement;
  /** Кнопка выбора оплаты наличными */
  protected cashButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);

    this.addressInputElement = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

    this.addressInputElement.addEventListener("input", () => {
      events.emit(AppEvent.FormChanged, {
        field: "address",
        value: this.addressInputElement.value,
      });
    });

    this.cardButton.addEventListener("click", () => {
      this.events.emit(AppEvent.FormChanged, {
        field: "payment",
        value: "online",
      });
    });

    this.cashButton.addEventListener("click", () => {
      this.events.emit(AppEvent.FormChanged, {
        field: "payment",
        value: "cash",
      });
    });
  }

  /**
   * Устанавливает состояние кнопок оплаты (активна/неактивна).
   * @param cardValid - валидность способа оплаты картой
   * @param cashValid - валидность способа оплаты наличными
   */
  set paymentState(value: string) {
    this.cardButton.classList.remove("button_alt-active");
    this.cashButton.classList.remove("button_alt-active");

    if (value === "online") {
      this.cardButton.classList.add('button_alt-active');
    } else if (value === "cash") {
      this.cashButton.classList.add('button_alt-active');
    }
  }

  /**
   * Устанавливает адрес (вообще, нужно для очистки поля формы после повторных заказов).
   * @param value - адрес
   */
  set address (value: string) {
    this.addressInputElement.value = value;
  }
}