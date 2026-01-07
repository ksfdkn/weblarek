import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { BaseForm } from "./BaseForm";
import { AppEvent } from "../Events/Events";

interface IOrderForm {
  address: string;
  payment: string;
  errors?: string;
  isValid?: boolean;
}

export class OrderForm extends BaseForm<IOrderForm> {
  protected addressInputElement: HTMLInputElement;
  protected cardButton: HTMLButtonElement;
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

  set paymentState(value: string) {
    this.cardButton.classList.remove("button_alt-active");
    this.cashButton.classList.remove("button_alt-active");

    if (value === "online") {
      this.cardButton.classList.add('button_alt-active');
    } else if (value === "cash") {
      this.cashButton.classList.add('button_alt-active');
    }
  }

  set address (value: string) {
    this.addressInputElement.value = value;
  }
}