import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export abstract class BaseForm<T> extends Component<T> {
  protected errorsElement: HTMLElement;
  protected submitButton?: HTMLButtonElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);
    this.events = events;

    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container);

    const button = container.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) {
      this.submitButton = button;
    }

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const formName = this.container.getAttribute("name");

      if(formName) {
        this.events.emit(`${formName}:submitted`);
      }
    });
  }

  set errors (value: string) {
    this.errorsElement.textContent = value;
  }

  set isValid(value: boolean) {
    if (this.submitButton) {
      this.submitButton.disabled = !value;
    }
  }
}