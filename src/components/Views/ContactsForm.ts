import { BaseForm } from "./BaseForm";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { AppEvent } from "../Events/Events";

interface IContactsForm {
  phone: string;
  email: string;
  errors?: string;
  isValid?: boolean;
}

export class ContactsForm extends BaseForm<IContactsForm> {
  protected phoneInputElement: HTMLInputElement;
  protected emailInputElement: HTMLInputElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events);

    this.phoneInputElement = ensureElement<HTMLInputElement>("input[name='phone']", this.container);
    this.emailInputElement = ensureElement<HTMLInputElement>("input[name='email']", this.container);

    this.phoneInputElement.addEventListener("input", () => {
      events.emit(AppEvent.FormChanged, {
        field: "phone",
        value: this.phoneInputElement.value,
      });
    });

    this.emailInputElement.addEventListener("input", () => {
      events.emit(AppEvent.FormChanged, {
        field: "email",
        value: this.emailInputElement.value,
      });
    });
  }

  set phone (value: string) {
    this.phoneInputElement.value = value;
  }

  set email (value: string) {
    this.emailInputElement.value = value;
  }
}