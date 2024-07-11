import { IEvents } from '../base/Events';
import { provideElement } from '../../utils/utils';
import { Component } from '../base/Components';

// Интерфейс для данных модального окна
interface IModalData {
  content: HTMLElement | null;
}

// Класс для модального окна
export class Modal extends Component<IModalData> {
    protected closeButton: HTMLButtonElement;
    protected contentContainer: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
      super(container);
        // Инициализация элементов модального окна
      this.closeButton = provideElement<HTMLButtonElement>('.modal__close', container);
      this.contentContainer = provideElement<HTMLElement>('.modal__content', container);
   // Обработчик закрытия модального окна по нажатию на кнопку
      this.closeButton.addEventListener('click', this.close.bind(this));
        // Обработчик закрытия модального окна по нажатию на область вне контента
      this.container.addEventListener('click', this.close.bind(this));
      // Остановка распространения события клика внутри контента
      this.contentContainer.addEventListener('click', (event) => event.stopPropagation());
    }
    // Сеттер для установки контента модального окна
    set content(value: HTMLElement) {
      if (value !== null) {
        this.contentContainer.replaceChildren(value);
      } else {
        this.contentContainer.innerHTML = '';
      }
    }
   // Метод для открытия модального окна
    open() {
      this.container.classList.add('modal_active');
      this.events.emit('modal:open');
    }
    // Метод для закрытия модального окна
    close() {
      this.container.classList.remove('modal_active');
      this.content = null;
      this.events.emit('modal:close');
    }
  // Метод рендеринга модального окна с данными
    render(data: IModalData): HTMLElement {
      super.render(data);
      this.open();
      return this.container;
    }
  }

  