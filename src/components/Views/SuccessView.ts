import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { AppEvent } from "../Events/Events";
import { ISuccessView } from "../../types";

/**
 * Компонент отображения успешного завершения заказа.
 * Показывает сообщение о списании средств и кнопку закрытия.
 *
 * Основные функции:
 * - отображение итоговой суммы заказа;
 * - обработка клика по кнопке закрытия и эмитация события закрытия.
 */
export class SuccessView extends Component<ISuccessView> {
  /** Элемент описания результата заказа (класс `.order-success__description`). */
  protected descriptionElement: HTMLElement;
  /** Кнопка закрытия окна успеха (класс `.order-success__close`). */
  protected closeButton: HTMLButtonElement;

  /**
   * Создаёт экземпляр компонента успешного завершения заказа.
   *
   * @param container - корневой HTMLElement компонента.
   * @param events - экземпляр системы событий (`IEvents`) для отправки уведомлений.
   */
  constructor (container: HTMLElement, protected events: IEvents) {
    super (container);

    this.descriptionElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.closeButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);

    this.closeButton.addEventListener("click", () => {
      this.events.emit(AppEvent.SuccessClosed);
    });
  }

  /**
   * Сеттер для обновления отображаемой суммы заказа.
   *
   * @param value - числовое значение итоговой суммы в синапсах.
   */
  set total (value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }
}