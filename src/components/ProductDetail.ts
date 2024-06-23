import { Product } from '../types';
import { apiClient } from '../ApiClient';
import { eventEmitter } from '../EventEmitter';

class ProductDetail {
  private product: Product | null = null;

  constructor(private productId: number) {
    eventEmitter.on('productLoaded', this.render.bind(this));
  }

  async loadProduct(): Promise<void> {
    this.product = await apiClient.getProduct(this.productId);
    eventEmitter.emit('productLoaded');
  }

  render(): void {
    if (!this.product) return;

    const container = document.getElementById('product-detail');
    if (container) {
      container.innerHTML = `
        <h1>${this.product.name}</h1>
        <p>${this.product.description}</p>
        <p>Price: ${this.product.price}</p>
        <img src="${this.product.imageUrl}" alt="${this.product.name}">
      `;
    }
  }
}

export default ProductDetail;
