import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { BaseForm } from "./BaseForm";

interface IOrderForm {
  address: string;
  payment: string;
  errors?: string;
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
      events.emit("form:change", {
        field: "address",
        value: this.addressInputElement.value,
      });
    });

    this.cardButton.addEventListener("click", () => {
      this.events.emit("form:change", {
        field: "payment",
        value: "online",
      });
    });

    this.cashButton.addEventListener("click", () => {
      this.events.emit("form:change", {
        field: "payment",
        value: "cash",
      });
    });
  }

  set paymentState(value: "online" | "cash") {
    this.cardButton.classList.remove("button_alt-active");
    this.cashButton.classList.remove("button_alt-active");

    if (value === 'online') {
      this.cardButton.classList.add('button_alt-active');
    } else {
      this.cashButton.classList.add('button_alt-active');
    }
  }
}