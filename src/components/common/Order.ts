import { Component } from '../base/Components';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { IOrderProposal } from '../../types/index';
export type FormErrors = Partial<Record<keyof IOrder, string>>;

export class Form<T> extends Component<IFormState> {
	protected submitButton: HTMLButtonElement;
	protected errorElement: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this.submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errorElement = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);
		this.container.addEventListener('input', this.handleInputEvent.bind(this));
		this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.errorElement, value);
	}

	handleSubmit(e: Event) {
		e.preventDefault();
		this.events.emit(`orderForm:submit`);
	}

	handleInputEvent(e: Event) {
		const target = e.target as HTMLInputElement;
		const field = target.name as keyof T;
		const value = target.value;
		this.onInputChange(field, value);
	}

	buttonDisable(state: boolean) {
		this.setDisabled(this.submitButton, state);
	}
	clearOrderForm() {
		this.container.reset();
		this.setText(this.errorElement, '');
		this.valid = false;
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}

export interface IOrderForm {
	address?: string;
	email?: string;
	phone?: string;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export class OrderForm extends Form<IOrderProposal> {
	inputAddress: HTMLInputElement;
	paymentMethodCash: HTMLButtonElement;
	paymentMethodOnline: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
		this.inputAddress = ensureElement<HTMLInputElement>(
			'.form__input',
			this.container
		);
		this.paymentMethodCash = ensureElement<HTMLButtonElement>(
			'button[data-method=cash]',
			this.container
		);
		this.paymentMethodOnline = ensureElement<HTMLButtonElement>(
			'button[data-method=online]',
			this.container
		);
		this.setupEventListeners();
	}

	setupEventListeners() {
		this.inputAddress.addEventListener(
			'input',
			this.handleAddressInputChange.bind(this)
		);
		this.paymentMethodCash.addEventListener(
			'click',
			this.handleCashPaymentClick.bind(this)
		);
		this.paymentMethodOnline.addEventListener(
			'click',
			this.handleOnlinePaymentClick.bind(this)
		);

		this.toggleButtonState();
	}

	handleAddressInputChange() {
		const value = this.inputAddress.value;
		this.onInputChange('address', value);
	}

	handleCashPaymentClick() {
		this.handlePayment(
			'cash',
			this.paymentMethodCash,
			'paymentCash:changed',
			this.paymentMethodOnline
		);
	}

	handleOnlinePaymentClick() {
		this.handlePayment(
			'online',
			this.paymentMethodOnline,
			'paymentOnline:changed',
			this.paymentMethodCash
		);
	}

	handlePayment(
		method: string,
		pressedButton: HTMLButtonElement,
		eventName: string,
		otherButton: HTMLButtonElement
	) {
		const currentMethod = pressedButton.getAttribute('data-method') || '';
		if (currentMethod === method) {
			pressedButton.classList.add('button_alt-active');
			this.events.emit(eventName, { method });
			otherButton.classList.remove('button_alt-active');
		}
	}

	clearOrderForm() {
		super.clearOrderForm();
		this.paymentMethodOnline.classList.remove('button_alt-active');
		this.paymentMethodCash.classList.remove('button_alt-active');
	}

	toggleButtonState() {
		const isAddressField = this.inputAddress.value.trim() !== '';
		this.buttonDisable(!isAddressField);
	}
}
