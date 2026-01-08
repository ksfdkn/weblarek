import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";
import { TModelContent } from "../../types";

/**
 * Компонент модального окна.
 */
export class Modal extends Component<TModelContent> {
  /** Кнопка закрытия модального окна (элемент с классом `.modal__close`). */
  protected closeButton: HTMLButtonElement;
   /** Контейнер для динамического контента внутри модального окна (элемент с классом `.modal__content`). */
  protected modalContent: HTMLElement;

  /**
   * Создаёт экземпляр модального окна.
   *
   * @param container - корневой HTMLElement модального окна.
   * @param events - экземпляр системы событий (`IEvents`) для отправки уведомлений о действиях.
   */
  constructor (container: HTMLElement, protected events: IEvents) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);

    this.closeButton.addEventListener("click", () => {
      this.events.emit(AppEvent.ModalClosed);
    });
  }

  /**
   * Сеттер для установки контента модального окна.
   *
   * @param value - HTMLElement, который будет назначен как контент окна.
   */
  set content (value: TModelContent) {
    this.content = value;
  }

  /**
   * Открывает модальное окно и вставляет указанный контент.
   *
   * @param content - HTMLElement для отображения внутри окна.
   */
  open (content: TModelContent): void {
    this.render(this.modalContent.appendChild(content));
    this.container.classList.add("modal_active");
  }

  /** Закрывает модальное окно и очищает его содержимое. */
  close (): void {
    this.container.classList.remove("modal_active");
    this.modalContent.innerHTML = "";
  }

  /** Очищает содержимое модального окна без его закрытия. */
  clear (): void {
    this.modalContent.innerHTML = "";
  }
}