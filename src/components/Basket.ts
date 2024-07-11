import { IProduct } from '../types';
import { handlePrice } from '../utils/utils';
import { Component } from './base/Components';
import { IEvents } from './base/Events';

// /Интерфейс, описывающий корзину товаров
export interface IBasket {
  list: HTMLElement[];// Массив элементов li с товаром
  price: number;// Общая цена товаров
}


// Класс, описывающий корзину товаров
  export class Basket extends Component<IBasket> {
  // Ссылки на внутренние элементы
  protected _list: HTMLElement; // Ссылка на элемент списка товаров
  protected _price: HTMLElement; // Ссылка на элемент с общей ценой товаров
  protected _button: HTMLButtonElement; // Ссылка на кнопку оформления заказа

  // Конструктор принимает имя блока, родительский элемент и обработчик событий
  constructor(
    protected blockName: string,
    container: HTMLElement,
    protected events: IEvents
  ) {
    super(container);
 // Инициализация элементов корзины
    this._button = container.querySelector(`.${blockName}__button`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._list = container.querySelector(`.${blockName}__list`);
 // Добавление обработчика событий на кнопку оформления заказа
    if (this._button) {
      this._button.addEventListener('click', () => this.events.emit('basket:order'))
    }
  }

  // Сеттер для общей цены
  set price(price: number) {
    this._price.textContent = handlePrice(price) + ' синапсов'; // Обновление текста элемента с общей ценой
  }

  // Сеттер для списка товаров 
  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items); // Замена содержимого списка товаров
    this._button.disabled = items.length ? false : true; // Отключение кнопки, если список товаров пуст
  }

  // Метод отключающий кнопку "Оформить"
  disableButton() {
    this._button.disabled = true; // Отключение кнопки оформления заказа
  }

  // Метод для обновления индексов таблички при удалении товара из корзины
  refreshIndices() {
    Array.from(this._list.children).forEach(
      (item, index) =>
        (item.querySelector(`.basket__item-index`)!.textContent = (
          index + 1
        ).toString()) // Обновление индексов товаров в списке
    );
  }
}

// Интерфейс, описывающий продукт в корзине
export interface IProductBasket extends IProduct {
  id: string; // Идентификатор товара
  index: number; // Индекс товара в корзине
}

// Интерфейс, описывающий действия для элемента корзины
export interface IStoreItemBasketActions {
  onClick: (event: MouseEvent) => void; // Обработчик нажатия на кнопку удаления товара из корзины
}

// Класс, описывающий элемент корзины
export class StoreItemBasket extends Component<IProductBasket> {
  protected _index: HTMLElement; // Ссылка на элемент с индексом товара
  protected _title: HTMLElement; // Ссылка на элемент с названием товара
  protected _price: HTMLElement; // Ссылка на элемент с ценой товара
  protected _button: HTMLButtonElement; // Ссылка на кнопку удаления товара

  constructor(
    protected blockName: string,
    container: HTMLElement,
    actions?: IStoreItemBasketActions
  ) {
    super(container);

    // Инициализация элементов товара в корзине
    this._title = container.querySelector(`.${blockName}__title`);
    this._index = container.querySelector(`.basket__item-index`);
    this._price = container.querySelector(`.${blockName}__price`);
    this._button = container.querySelector(`.${blockName}__button`);

    // Добавление обработчика нажатия на кнопку удаления товара
    if (this._button) {
      this._button.addEventListener('click', (evt) => {
        this.container.remove(); // Удаление товара из DOM
        actions?.onClick(evt); // Вызов переданного обработчика
      });
    }
  }

  // Сеттер для названия товара
  set title(value: string) {
    this._title.textContent = value;
  }

  // Сеттер для индекса товара
  set index(value: number) {
    this._index.textContent = value.toString();
  }

  // Сеттер для цены товара
  set price(value: number) {
    this._price.textContent = handlePrice(value) + ' синапсов'; // Обновление текста элемента с ценой товара
  }
}