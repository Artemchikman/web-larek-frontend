import { IOrderProposal } from './../types/index';
import { Form } from './common/Order';
import { ensureElement } from '..//utils/utils';
import { IEvents } from '..//components/base/Events';

export class ContactUsForm extends Form<IOrderProposal> {
	emailInput: HTMLInputElement;
	phoneInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.phoneInput = ensureElement<HTMLInputElement>(
			'.form__input[name=phone]',
			this.container
		);
		this.emailInput = ensureElement<HTMLInputElement>(
			'.form__input[name=email]',
			this.container
		);

		this.addEventListeners();
		this.updateButtonState();
	}

	addEventListeners() {
		this.emailInput.addEventListener('input', this.handleEmailInput.bind(this));
		this.phoneInput.addEventListener('input', this.handlePhoneInput.bind(this));
	}

	handleSubmit(event: Event) {
		if (this instanceof ContactUsForm) {
			event.preventDefault();

			this.events.emit('contactsForm:submit');
			return true;
		} else {
			super.handleSubmit(event);
		}
	}

	handleEmailInput() {
		const value = this.emailInput.value;
		this.onInputChange('email', value);
	}

	handlePhoneInput() {
		const value = this.phoneInput.value;
		this.onInputChange('phone', value);
	}
	updateButtonState() {
		const isEmailFilled = this.emailInput.value.trim() !== '';
		const isPhoneFilled = this.phoneInput.value.trim() !== '';
		this.buttonDisable(!(isEmailFilled && isPhoneFilled));
	}
}
