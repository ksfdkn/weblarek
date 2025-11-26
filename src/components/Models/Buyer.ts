import { IBuyer, TPayment } from "../../types";


export class Buyer {
  private payment: TPayment| string = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  /**
   * Обновляет поле `payment`
   * @param payment {TPayment} - выбранный способ оплаты
   */
  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  /**
   * Обновляет поле `email`
   * @param email {string} - email
   */
  setEmail(email: string): void {
    this.email = email;
  }

  /**
   * Обновляет поле `phone`
   * @param phone {string} - телефон
   */
  setPhone(phone: string): void {
    this.phone = phone;
  }

  /**
   * Обновляет поле `address`
   * @param address {string} - адрес
   */
  setAddress(address: string): void {
    this.address = address;
  }

  /**
   * Возвращает объект с текущими данными покупателя
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
   * Возвращает: объект, где ключи — поля `IBuyer`, а значения — сообщения об ошибках (если поле невалидно). 
   * Если поле валидно, оно отсутствует в объекте
   * @returns { 
   *  payment?: string; 
   *  email?: 
   *  string; 
   *  phone?: string;
   *  address?: string; 
   * } - ключи — поля `IBuyer`, значения — сообщения об ошибках
   */
  validate(): {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
  } {
    const errors: {
      payment?: string;
      email?: string;
      phone?: string;
      address?: string;
    } = {};

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