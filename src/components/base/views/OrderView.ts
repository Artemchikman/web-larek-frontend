import { Customer } from '../models/Customer';
import { Cart } from '../models/Cart';

export interface OrderView {
    displayOrderForm(): void;
    submitOrder(customer: Customer, cart: Cart, paymentMethod: string): void;
}
