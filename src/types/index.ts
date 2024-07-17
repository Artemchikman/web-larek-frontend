// Интерфейс для описания единицы товара
export interface ICard {
	title: string;
	id: string;
	description: string;
	category: string;
	price: number | null;
	image: string;
	buttonDisable(state: boolean): void;
}

// Интерфейс описывающий заказ
export interface IOrderProposal {
	email: string;
	phone: string;
	payment: string;
	address: string;
	total: number;
	items: string[];
}
export type LabelsType =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export interface IPaymentModifiedEvent {
	method: string;
}
