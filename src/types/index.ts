// Типы данных

// Product
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

// Customer
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

// CartItem
export interface CartItem {
    product: Product;
    quantity: number;
}

// Cart
export interface Cart {
    items: CartItem[];
    totalAmount: number;
}

// View Интерфейсы

// ProductView
export interface ProductView {
    displayProducts(products: Product[]): void;
    displayError(error: string): void;
}

// CartView
export interface CartView {
    displayCart(cart: Cart): void;
    displayTotal(total: number): void;
}

// OrderView
export interface OrderView {
    displayOrderForm(): void;
    submitOrder(customer: Customer, cart: Cart, paymentMethod: string): void;
}

// Presenter Интерфейсы

// ProductPresenter
export interface ProductPresenter {
    loadProducts(): void;
}

// CartPresenter
export interface CartPresenter {
    addToCart(product: Product, quantity: number): void;
    removeFromCart(productId: string): void;
    calculateTotal(): number;
}

// OrderPresenter
export interface OrderPresenter {
    placeOrder(customer: Customer, cart: Cart, paymentMethod: string): void;
}
