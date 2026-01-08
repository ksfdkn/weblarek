import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

/**
 * Абстрактный базовый класс для форм (заказ, контакты).
 * Добавляет общую логику работы с ошибками и кнопкой отправки.
 *
 * @template T - тип данных формы
 */
export abstract class BaseForm<T> extends Component<T> {
  /** Элемент для отображения сообщений об ошибках */
  protected errorsElement: HTMLElement;
  /** Кнопка отправки формы (может отсутствовать) */
  protected submitButton?: HTMLButtonElement;

   /**
   * Создаёт форму.
   * @param container - HTMLElement формы
   * @param events - экземпляр системы событий для отправки уведомлений
   */
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

  /**
   * Устанавливает текст ошибки в соответствующем элементе.
   * @param value - сообщение об ошибке
   */
  set errors (value: string) {
    this.errorsElement.textContent = value;
  }

  /**
   * Активирует или деактивирует кнопку отправки формы.
   * @param value - true для активации, false для блокировки
   */
  set isValid(value: boolean) {
    if (this.submitButton) {
      this.submitButton.disabled = !value;
    }
  }
}