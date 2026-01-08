import { BaseForm } from "./BaseForm";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { AppEvent } from "../Events/Events";
import { IContactsForm } from "../../types";

/**
 * Компонент формы ввода контактных данных.
 * Обеспечивает:
 * - отображение и управление полями ввода телефона и email;
 * - отправку событий при изменении полей;
 * - установку значений полей через сеттеры.
 */
export class ContactsForm extends BaseForm<IContactsForm> {
  /** Поле ввода номера телефона (input с name="phone"). */
  protected phoneInputElement: HTMLInputElement;
  /** Поле ввода email-адреса (input с name="email"). */
  protected emailInputElement: HTMLInputElement;

  /**
   * Создаёт экземпляр формы контактов.
   *
   * @param container - корневой HTMLElement формы.
   * @param events - экземпляр системы событий (`IEvents`) для отправки уведомлений.
   */
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

  /**
   * Сеттер для установки значения поля телефона.
   *
   * @param value - строка с номером телефона.
   */
  set phone (value: string) {
    this.phoneInputElement.value = value;
  }

  /**
   * Сеттер для установки значения поля email.
   *
   * @param value - строка с email‑адресом.
   */
  set email (value: string) {
    this.emailInputElement.value = value;
  }
}