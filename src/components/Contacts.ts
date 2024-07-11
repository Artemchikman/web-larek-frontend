import { Form } from './common/Form';
import { IEvents } from './base/Events';

//  Интерфейс, описывающий окошко контакты
  export interface IContacts {
  phone: string;
  email: string;
}

  // Класс, описывающий окошко контакты
export class Contacts extends Form<IContacts> {
  // Конструктор принимает родительский элемент и обработчик событий
  constructor(
    container: HTMLFormElement,
    events: IEvents
  ) {
    super(container, events);
  }
}