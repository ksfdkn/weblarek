import { BaseForm } from "./BaseForm";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IContactsForm {
  phone: string;
  email: string;
}

export class ContactsForm extends BaseForm<IContactsForm> {
  protected phoneInputElement: HTMLInputElement;
  protected emailInputElement: HTMLInputElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events);

    this.phoneInputElement = ensureElement<HTMLInputElement>("input[name='phone']", this.container);
    this.emailInputElement = ensureElement<HTMLInputElement>("input[name='email']", this.container);

    this.phoneInputElement.addEventListener("input", () => {
      events.emit("form:changed", {
        field: "phone",
        value: this.phoneInputElement.value,
      });
    });

    this.emailInputElement.addEventListener("input", () => {
      events.emit("form:changed", {
        field: "email",
        value: this.emailInputElement.value,
      });
    });
  }
}