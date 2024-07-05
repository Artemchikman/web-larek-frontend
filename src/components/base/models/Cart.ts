import { Product } from './Product';

export class Cart {
    private products: Product[] = [];

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(productId: string) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    updateFromApi(data: any) {
        this.products = data.products.map((productData: any) => 
            new Product(
                productData.id,
                productData.name,
                productData.price,
                productData.description
            )
        );
    }

    getProducts() {
        return this.products;
    }
}