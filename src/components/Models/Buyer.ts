import { IBuyer, TPayment, ValidationErrors } from "../../types";
import { IEvents } from "../base/Events"

/**
 * Класс Buyer представляет модель данных покупателя
 */
export class Buyer {
  private payment: TPayment | string = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  constructor(private events: IEvents) {};

  /**
   * Обновляет поле `payment`
   * @param payment {TPayment} - выбранный способ оплаты
   */
  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit("buyer:changed");
  }

  /**
   * Обновляет поле `email`
   * @param email {string} - email
   */
  setEmail(email: string): void {
    this.email = email;
    this.events.emit("buyer:changed");
  }

  /**
   * Обновляет поле `phone`
   * @param phone {string} - телефон
   */
  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit("buyer:changed");
  }

  /**
   * Обновляет поле `address`
   * @param address {string} - адрес
   */
  setAddress(address: string): void {
    this.address = address;
    this.events.emit("buyer:changed");
  }

  /**
   * Возвращает объект с текущими данными покупателя в формате интерфейса IBuyer
   * @returns {IBuyer} - объект с текущими данными покупателя
   */
  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  /**
   * Сбрасывает все поля до начальных значений
   */
  clear(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  /**
   * Выполняет валидацию данных покупателя
   * Если поле валидно, оно отсутствует в объекте
   * @returns {ValidationErrors} - объект, где ключи — поля `IBuyer`, а значения — сообщения об ошибках (если поле невалидно).
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.payment) {
      errors.payment = "Укажите вид оплаты";
    }

    if (!this.email) {
      errors.email = "Укажите ваш email";
    }

    if (!this.phone) {
      errors.phone = "Укажите ваш телефон";
    }

    if (!this.address) {
      errors.address = "Укажите ваш адрес";
    }

    return errors;
  }
}