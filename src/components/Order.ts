import { IEvents } from './base/Events';
import { Form } from './common/Form';

// Интерфейс, описывающий окошко заказа товара
export interface IOrder {
	address: string; // Адрес
	payment: string; // Способ оплаты
}

// Класс, описывающий окошко заказа товара
export class Order extends Form<IOrder> {
	// Сссылки на внутренние элементы
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	// Конструктор принимает имя блока, родительский элемент и обработчик событий
	constructor(
		protected blockName: string,
		container: HTMLFormElement, // Родительский элемент (форма)
		protected events: IEvents
	) {
		super(container, events);
		// Инициализация кнопок оплаты
		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		// Если кнопка оплаты наличными существует, добавляем обработчик клика
		if (this._cash) {
			this._cash.addEventListener('click', () => {
				this._cash.classList.add('button_alt-active'); // Подсвечиваем кнопку оплаты наличными
				this._card.classList.remove('button_alt-active');   // Убираем подсветку с кнопки оплаты картой
				this.onInputChange('payment', 'cash');   // Обновляем поле 'payment' значением 'cash'
			});
		}

		// Если кнопка оплаты картой существует, добавляем обработчик клика
		if (this._card) {
			this._card.addEventListener('click', () => {
				this._card.classList.add('button_alt-active');  // Подсвечиваем кнопку оплаты картой
				this._cash.classList.remove('button_alt-active'); // Убираем подсветку с кнопки оплаты наличными
				this.onInputChange('payment', 'card'); // Обновляем поле 'payment' значением 'card'
			});
		}
	}

	// Метод, отключающий подсвечивание кнопок
	disableButtons() {
		this._cash.classList.remove('button_alt-active'); // Убираем подсветку с кнопки оплаты наличными
		this._card.classList.remove('button_alt-active');  // Убираем подсветку с кнопки оплаты картой
	} 
}
