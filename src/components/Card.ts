import { Component } from './base/Components';
import { ProductCategory } from '../types';
import { provideElement, handlePrice } from '../utils/utils';
import { CDN_URL } from '../utils/constants';
import { categoryMapping } from '../utils/constants';

// Интерфейс для действий карточки
interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

// Интерфейс для свойств карточки
export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}

// Класс, представляющий карточку товара
export class Card extends Component<ICard> {
  // Ссылки на внутренние элементы карточки
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _category: HTMLElement;
  protected _price: HTMLElement;
  protected _button: HTMLButtonElement;

  // Конструктор принимает имя блока, родительский контейнер и объект с колбэк функциями
  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: ICardActions
  ) {
    super(container);

    // Инициализация внутренних элементов карточки
    this._title = provideElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = provideElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._button = container.querySelector(`.${blockName}__button`);
    this._category = container.querySelector(`.${blockName}__category`);
    this._price = container.querySelector(`.${blockName}__price`);

    // Добавление обработчика события на кнопку
    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  // Сеттер и геттер для уникального ID
  set id(value: string) {
    this.container.dataset.id = value;
  }
  get id(): string {
    return this.container.dataset.id || '';
  }

  // Сеттер и гетер для названия
  set title(value: string) {
    this._title.textContent = value;
  }
  get title(): string {
    return this._title.textContent || '';
  }

  // Сеттер для изображения
  set image(value: string) {
    this._image.src = CDN_URL + value;
  }

  // Сеттер для определения, выбран ли товар
  set selected(value: boolean) {
    if (!this._button.disabled) {
      this._button.disabled = value;
    }
  }

  // Сеттер для цены
  set price(value: number | null) {
    this._price.textContent = value
      ? handlePrice(value) + ' синапсов'
      : 'Бесценно';
    if (this._button && !value) {
      this._button.disabled = true;
    }
  }

  // Сеттер для категории
  set category(value: ProductCategory) {
    this._category.textContent = value;
    this._category.classList.add(categoryMapping[value]);
  }
}

// Класс, представляющий элемент магазина
export class StoreItem extends Card {
  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);
  }
}

// Класс, представляющий превью элемента магазина
export class StoreItemPreview extends Card {
  protected _description: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super('card', container, actions);

    // Инициализация описания карточки
    this._description = container.querySelector(`.${this.blockName}__text`);
  }

  // Сеттер для описания
  set description(value: string) {
    this._description.textContent = value;
  }
}
