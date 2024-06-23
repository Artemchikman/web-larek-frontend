export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface ApiClient {
    getProducts(): Promise<Product[]>;
    getProduct(id: number): Promise<Product>;
    getUser(id: number): Promise<User>;
  }
  