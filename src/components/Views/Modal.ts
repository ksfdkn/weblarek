import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";

type TModelContent = HTMLElement;

export class Modal extends Component<TModelContent> {
  protected closeButton: HTMLButtonElement;
  protected modalContent: HTMLElement;

  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);

    this.closeButton.addEventListener("click", () => {
      this.events.emit(AppEvent.ModalClosed);
    });
  }

  set content (value: TModelContent) {
    this.content = value;
  }

  open (content: TModelContent): void {
    this.render(this.modalContent.appendChild(content));
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
