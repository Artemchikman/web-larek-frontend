import { Component } from '../base/Components';
import { IEvents } from '../base/Events';

export interface ISuccessModal {
	title: HTMLElement;
	totalPrice: HTMLElement;
	buttonToMainPage: HTMLButtonElement;
}
export class SuccessModal extends Component<ISuccessModal> {
	protected title: HTMLElement;
	protected _description: HTMLElement;
	protected buttonToMainPage: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.title = this.container.querySelector('.order-success__title');
		this._description = this.container.querySelector(
			'.order-success__description'
		);
		this.buttonToMainPage = this.container.querySelector(
			'.order-success__close'
		);
		this.buttonToMainPage.addEventListener(
			'click',
			this.handleSuccessSubmit.bind(this)
		);
	}

	set description(value: string) {
		this._description.textContent = value;
	}

	handleSuccessSubmit() {
		this.events.emit('modalSucces:close');
	}
}
