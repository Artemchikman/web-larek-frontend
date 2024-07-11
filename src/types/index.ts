import { Product } from '../components/AppData';

// Типы категорий продукта
export type ProductCategory =
| 'софт-скил'
| 'хард-скил'
| 'кнопка'
| 'дополнительное'
| 'другое';

// Сопоставление категорий продукта с метками
export type CategoryLabels = {
  [Key in ProductCategory]: string;
};

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface ApiResponse {
  items: IProduct[];
}

// Интерфейс продукта
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number | null;
  selected: boolean;
}

// Интерфейс состояния приложения
export interface IAppState {
  basket: Product[];
  store: Product[];
  order: IOrder;
  formErrors: FormErrors;
  addToBasket(value: Product): void;
  deleteFromBasket(id: string): void;
  clearBasket(): void;
  getBasketAmount(): number;
  getTotalBasketPrice(): number;
  setItems(): void;
  setOrderField(field: keyof IOrderForm, value: string): void;
  validateContacts(): boolean;
  validateOrder(): boolean;
  refreshOrder(): boolean;
  setStore(items: IProduct[]): void;
  resetSelected(): void;
}

// Интерфейс заказа
export interface IOrder {
  items: string[];
  payment: string;
  total: number;
  address: string;
  email: string;
  phone: string;
}

// Интерфейс формы заказа
export interface IOrderForm {
  payment: string;
  address: string;
  email: string;
  phone: string;
}