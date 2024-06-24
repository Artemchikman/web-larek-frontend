export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface User {
    id: string;
    username: string;
}

export interface Order {
    id: string;
    productId: string;
    userId: string;
    quantity: number;
}

export interface APIResponse<T> {
    data: T;
    message: string;
}

export interface APIRequest<T> {
    payload: T;
    endpoint: string;
}
