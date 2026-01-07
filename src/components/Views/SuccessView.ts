import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

interface ISuccessView {
  total: number;
}

export class SuccessView extends Component<ISuccessView> {
  protected descriptionElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super (container);

    this.descriptionElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.closeButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);

    this.closeButton.addEventListener("click", () => {
      this.events.emit("success:closed");
    });
  }

  set total (value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}