import { Cart } from '../models/Cart';
import { events } from '../events/index';

export class CartView {
    private cartElement: HTMLElement;
    constructor(cartElement:string) {
        this.cartElement = document.getElementById(cartElementId);
    }

    displayCart(cart: Cart) {
        console.log('Displaying cart:', cart.getProducts());
    }

    displayError(message: string) {
        console.error('Cart error:', message);
    }
}