import { OrderView } from '../views/OrderView';
import { Customer } from '../models/Customer';
import { Cart } from '../models/Cart';
import { events } from '../events/index';

export class OrderPresenter {
    constructor(
        private orderView: OrderView,
        private customer: Customer,
        private cart: Cart
    ) {
        this.initialize();
    }

    private initialize() {
        events.on('order:submit', this.placeOrder.bind(this));
    }

    private placeOrder(paymentMethod: string) {
        try {
            this.orderView.submitOrder(this.customer, this.cart, paymentMethod);
        } catch (error) {
            console.error("Order submission failed", error);
        }
    }
}
