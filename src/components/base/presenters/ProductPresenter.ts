import { ProductView } from '../views/ProductView';
import { Product } from '../models/Product';
import { ApiClient } from '../../../utils/apiClient';
import { events } from '../events/index';

export class ProductPresenter {
    private apiClient: ApiClient;

    constructor(
        private productView: ProductView,
        private products: Product[] = []
    ) {
        this.apiClient = new ApiClient();
        this.initialize();
    }

    private initialize() {
        events.on('product:load', this.loadProducts.bind(this));
        events.on('cart:add', this.addToCart.bind(this));
    }

    private async loadProducts() {
        try {
            const data = await this.apiClient.get('/products');
            this.products = data.map((item: any) => Product.fromApi(item));
            this.productView.displayProducts(this.products);
        } catch (error) {
            this.productView.displayError(error.message);
        }
    }

    private async addToCart(productId: string) {
        try {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                await this.apiClient.post('/cart', { productId: product.id });
                alert('Product added to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart', error);
        }
    }
}