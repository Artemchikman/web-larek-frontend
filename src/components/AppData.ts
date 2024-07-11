import { IOrder, IProduct, FormErrors, IOrderForm } from '../types';
import { Model } from './base/Model';
import { IAppState } from '../types';

// Класс, представляющий продукт
export class Product extends Model<IProduct> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}

// Класс, описывающий состояние приложения
export class AppState extends Model<IAppState> {
  basket: Product[] = [];
  store: Product[];
  order: IOrder = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: ''
  };

  // Объект с ошибками форм
  formErrors: FormErrors = {};

  // Добавление товара в корзину
  addToBasket(value: Product) {
    this.basket.push(value);
  }

  // Удаление товара из корзины
  deleteFromBasket(id: string) {
    this.basket = this.basket.filter(item => item.id !== id);
  }

  // Очистка корзины
  clearBasket() {
    this.basket.length = 0;
  }

  // Получение количества товаров в корзине
  getBasketAmount() {
    return this.basket.length;
  }

  // Установка идентификаторов товаров в заказе
  setItems() {
    this.order.items = this.basket.map(item => item.id);
  }

  // Установка поля заказа
  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    // Валидация контактной информации
    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order);
    }
    // Валидация информации заказа
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }

  // Валидация контактной информации
  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  // Валидация информации заказа
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  // Очистка текущего заказа
  refreshOrder() {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      payment: ''
    };
  }

  // Получение общей стоимости товаров в корзине
  getTotalBasketPrice() {
    return this.basket.reduce((sum, next) => sum + (next.price || 0), 0);
  }

  // Установка списка товаров
  setStore(items: IProduct[]) {
    this.store = items.map((item) => new Product({ ...item, selected: false }, this.events));
    this.emitChanges('items:changed', { store: this.store });
  }

  // Сброс состояния выбранных товаров
  resetSelected() {
    this.store.forEach(item => item.selected = false);
  }
}