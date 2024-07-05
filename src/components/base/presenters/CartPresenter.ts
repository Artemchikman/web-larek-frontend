import { CartView } from '../views/CartView';
import { Cart } from '../models/Cart';
import { events } from '../events/index';
import { ApiClient } from '../../../utils/apiClient';
import { Product } from '../models/Product';

export class CartPresenter {
    private apiClient: ApiClient;

    constructor(
        private cartView: CartView,
        private cart: Cart = new Cart(),
        apiBaseUrl: string
    ) {
        this.apiClient = new ApiClient(apiBaseUrl);
        this.initialize();
    }

    private initialize() {
        events.on('cart:load', this.loadCart.bind(this));
        events.on('cart:add', this.addToCart.bind(this));
        events.on('cart:remove', this.removeFromCart.bind(this));
    }

    private async loadCart() {
        try {
            const data = await this.apiClient.get('/cart');
            this.cart.updateFromApi(data);
            this.cartView.displayCart(this.cart);
        } catch (error) {
            this.cartView.displayError(error.message);
        }
    }

    private async addToCart(productId: string) {
        try {
            const productData = await this.apiClient.post('/cart', { productId });
            const product = new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.description
            );
            this.cart.addProduct(product);
            this.cartView.displayCart(this.cart);
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    }

    private async removeFromCart(productId: string) {
        try {
            await this.apiClient.post('/cart/remove', { productId });
            this.cart.removeProduct(productId);
            this.cartView.displayCart(this.cart);
        } catch (error) {
            console.error('Error removing product from cart', error);
        }
    }
}