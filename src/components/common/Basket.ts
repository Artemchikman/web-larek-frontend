import { Component } from '../base/Components';
import { createElement, ensureElement } from '../../utils/utils';
import { ICardActions } from '../Card';

export class Basket extends Component<IBasketOverview> {
	protected _items: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._items = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price', this.container);
		this._button = ensureElement<HTMLElement>(
			'.basket__button',
			this.container
		);

		if (this._button) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._items.replaceChildren(...items);
		} else {
			this._items.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(total: number) {
		this.setText(this._total, `${total} синапсов`);
	}
	buttonDisable(state: boolean) {
		this.setDisabled(this._button, state);
	}
}

interface IBasketProduct {
	index: number;
	title: string;
	price: number;
}

export interface IBasketOverview {
	items: HTMLElement[];
	total: HTMLElement;
	basketButton: HTMLButtonElement;
	title: HTMLElement;
}

export class BasketItem extends Component<IBasketProduct> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._index = ensureElement<HTMLElement>(
			`.basket__item-index`,
			this.container
		);
		this._title = ensureElement<HTMLElement>('.card__title', this.container);
		this._price = ensureElement<HTMLElement>('.card__price', this.container);
		this._deleteButton = this.container.querySelector('.card__button');

		if (this._deleteButton) {
			this._deleteButton.addEventListener('click', actions.onClick);
		}
	}

	set title(title: string) {
		this._title.textContent = title;
	}

	set price(price: number) {
		this._price.textContent = price.toString();
	}
	set index(index: number) {
		this._index.textContent = index.toString();
	}
}
