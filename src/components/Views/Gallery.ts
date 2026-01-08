import { Component } from "../base/Component";
import { GalleryData } from "../../types";

/**
 * Компонент галереи (каталога) товаров.
 * Отвечает за отображение списка элементов (карточек товаров) в заданном контейнере.
 *
 * Основные функции:
 * - рендеринг списка элементов внутри контейнера;
 * - очистка и перезаполнение содержимого при обновлении данных.
 */
export class Gallery extends Component<GalleryData> {
  /** Контейнер для отображения каталога (корневой элемент галереи). */
  protected catalogElement: HTMLElement;

  /**
   * Создаёт экземпляр компонента галереи.
   *
   * @param container - корневой HTMLElement галереи.
   */
  constructor (container: HTMLElement) {
    super(container);

    this.catalogElement = this.container;
  }

  /**
   * Сеттер для обновления списка элементов в галерее.
   *
   * @param items - массив HTMLElement, представляющих карточки товаров или другие элементы каталога.
   */
  set catalog (items: HTMLElement[]) {
    this.catalogElement.innerHTML = "";

    items.forEach(item => {
      this.catalogElement.appendChild(item);
    });
  }
}