import { Product } from '../models/Product';
import { events } from '../events/index';

export class ProductView {
    private container: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with id ${containerId} not found`);
        }
        this.container = container;

        this.container.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'BUTTON' && target.dataset.productId) {
                events.emit('cart:add', target.dataset.productId);
            }
        });
    }

    displayProducts(products: Product[]): void {
        this.container.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';

            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <img src="${product.image}" alt="${product.name}" />
                <button data-product-id="${product.id}">Add to Cart</button>
            `;
            
            this.container.appendChild(productElement);
        });
    }

    displayError(error: string): void {
        this.container.innerHTML = `<p class="error">${error}</p>`;
    }
}