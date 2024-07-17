import { ICard, IOrderProposal } from './../types/index';
import { Model } from '..//components/base/Model';
import { FormErrors } from '..//components/common/Order';

export class AppData extends Model<IAppStateData> {
	protected basket: ICard[] = [];
	protected _cards: ICard[];
	protected _selectedCard: ICard;

	order: IOrderProposal = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};

	set Cards(cards: ICard[]) {
		this._cards = cards;
		this.events.emit('productList:changed', this._cards);
	}

	get Cards() {
		return this._cards;
	}

	addCardToBasket(card: ICard) {
		if (this.basket.some((item) => item.id === card.id)) {
			return;
		}
		this.basket.push(card);
	}

	removeCardFromBasket(card: ICard) {
		this.basket = this.basket.filter((item) => item.id !== card.id);
	}

	clearBasket() {
		this.basket = [];
	}

	getBasket(): ICard[] {
		return this.basket;
	}

	setOrderField<K extends keyof IOrderProposal>(
		field: K,
		value: IOrderProposal[K]
	) {
		this.order[field] = value;
		this.verifyOrder();
	}

	setContactsField<K extends keyof IOrderProposal>(
		field: K,
		value: IOrderProposal[K]
	) {
		this.order[field] = value;
		this.verifyContacts();
	}

	formErrors: FormErrors = {};

	verifyContacts() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	verifyOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}

export interface IAppStateData {
	cards: ICard[];
	selectedCard: ICard;
}
