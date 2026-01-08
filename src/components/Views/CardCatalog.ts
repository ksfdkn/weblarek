import { Card} from "./Card";
import { ensureElement } from "../../utils/utils";
import { categoryMap } from "../../utils/constants";
import { ICardActions, CategoryKey, TCardCatalog } from "../../types";

/**
 * Компонент карточки товара в каталоге.
 * Отображает изображение, категорию и базовую информацию о товаре.
 * Обеспечивает обработку клика по карточке.
 */
export class CardCatalog extends Card<TCardCatalog> {
  /** Элемент изображения товара (класс `.card__image`). */
  protected imageElement: HTMLImageElement;
  /** Элемент отображения категории товара (класс `.card__category`). */
  protected categoryElement: HTMLElement;

  /**
   * Создаёт экземпляр карточки товара для каталога.
   *
   * @param container - корневой HTMLElement карточки.
   * @param actions - объект с действиями (опционально), содержит колбэк `onClick`.
   */
  constructor (container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.categoryElement = ensureElement<HTMLElement>(".card__category", this.container);

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }    
  }

  /**
   * Сеттер для установки изображения товара.
   *
   * @param value - URL изображения.
   */
  set image(value: string) {
    this.setImage(this.imageElement, value, this.titleElement.textContent);
  }

  /**
   * Сеттер для установки категории товара.
   *
   * @param value - строка с названием категории.
   */
  set category (value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }
}