import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

type TModelContent = HTMLElement;

export class Modal extends Component<TModelContent> {
  protected closeButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);

    this.closeButton.addEventListener("click", () => {
      this.events.emit("modal:closed");
    });
  }

  set content (value: TModelContent) {
    this.modalContent.appendChild(value);
  }

  open (content: TModelContent): void {
    this.render();
    this.content = content;
    this.container.classList.add("modal_active");
  }

  close (): void {
    this.container.classList.remove("modal_active");
    this.modalContent.innerHTML = "";
  }

  clear (): void {
    this.modalContent.innerHTML = "";
  }
}
