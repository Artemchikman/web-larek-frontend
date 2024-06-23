import { ApiClient, Product, User } from './types';

class ApiClientImpl implements ApiClient {
  private apiOrigin: string;

  constructor(apiOrigin: string) {
    this.apiOrigin = apiOrigin;
  }

  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${this.apiOrigin}/products`);
    return response.json();
  }

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${this.apiOrigin}/products/${id}`);
    return response.json();
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(`${this.apiOrigin}/users/${id}`);
    return response.json();
  }
}

export const apiClient = new ApiClientImpl(process.env.API_ORIGIN);
