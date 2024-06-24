import { Product, User } from './models';

export interface ViewComponent<T> {
    render(data: T): void;
}

export class ProductView implements ViewComponent<Product> {
    render(data: Product): void {
        // Логика отображения продукта
    }
}

export class UserView implements ViewComponent<User> {
    render(data: User): void {
        // Логика отображения пользователя
    }
}
