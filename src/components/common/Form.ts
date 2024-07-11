import { Component } from '../base/Components';
import { IEvents } from '../base/Events';
import { provideElement } from '../../utils/utils';

// Интерфейс состояния формы
interface IFormState {
  valid: boolean;
  errors: string[];
}
// Класс для обработки форм
export class Form<T> extends Component<IFormState> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);
  // Инициализация элементов формы
    this._submit = provideElement<HTMLButtonElement>(
      'button[type=submit]',
      this.container
    );
    this._errors = provideElement<HTMLElement>('.form__errors', this.container);
  // Обработчик изменения ввода
    this.container.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const field = target.name as keyof T;
      const value = target.value;
      this.onInputChange(field, value);
    });

    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('orderInput:change', {
      field,
      value,
    })
  }

 // Сеттер для валидации формы
  set valid(value: boolean) {
    this._submit.disabled = !value;
  }

  // Сеттер для ошибок формы
  set errors(value: string) {
    this.setText(this._errors, value);
  }

// Метод рендеринга формы
  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state;
    super.render({ valid, errors });
    Object.assign(this, inputs);
    return this.container;
  }
}