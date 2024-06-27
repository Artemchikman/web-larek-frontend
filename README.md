# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура проекта
![alt text](image.png)

## Паттерн проектирования (MVP) Этот патерн разделяет пользовательский интерфейс на три части: Model, View и Presenter, что обеспечивает лучшее тестирование и поддержку кода.

Распределение классов между слоями паттерна MVP:
## Model

 Product: представляет данные товара.

export class Product {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public category: string,
        public image: string
    ) {}
    
    // Метод для обновления информации о продукте
    updateProduct(details: Partial<Product>) {
        Object.assign(this, details);
    }
}


 Customer: представляет данные покупателя.
 export class Customer {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: string,
        public address: string
    ) {}

    // Метод для обновления информации о покупателе
    updateCustomer(details: Partial<Customer>) {
        Object.assign(this, details);
    }
}

 Cart: представляет корзину покупок.
 export class Cart {
    items: CartItem[] = [];

    // Метод для добавления товара в корзину
    addItem(product: Product, quantity: number) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.updateQuantity(existingItem.quantity + quantity);
        } else {
            this.items.push(new CartItem(product, quantity));
        }
    }

    // Метод для удаления товара из корзины
    removeItem(productId: string) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    // Метод для очистки корзины
    clearCart() {
        this.items = [];
    }

    // Метод для расчета общей стоимости товаров в корзине
    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}
## View:

## ProductView: интерфейс для отображения продуктов.
Отображает список продуктов.
Отображает ошибки загрузки продуктов.

## CartView: интерфейс для отображения корзины.
Отображает содержимое корзины.
Отображает общую стоимость товаров в корзине.

## OrderView: интерфейс для отображения формы заказа.
Отображает форму заказа.
Отправляет заказ.

## Presenter:

## ProductPresenter: управляет логикой представления для отображения товаров.
Загружает список продуктов и передает их в ProductView.
export class ProductPresenter {
    constructor(
        private productView: ProductView,
        private products: Product[] = []
    ) {
        this.initialize();
    }

    private initialize() {
        events.on('product:load', this.loadProducts.bind(this));
    }

    private loadProducts() {
        try {
            this.productView.displayProducts(this.products);
        } catch (error) {
            this.productView.displayError(error.message);
        }
    }
}

## CartPresenter: управляет логикой представления для корзины покупок и взаимодействий с ней.
Добавляет и удаляет товары из корзины.
Рассчитывает общую стоимость товаров в корзине и передает данные в CartView.
export class CartPresenter {
    constructor(
        private cartView: CartView,
        private cart: Cart
    ) {
        this.initialize();
    }

    // Инициализация событий
    private initialize() {
        events.on('cart:add', this.addToCart.bind(this));
        events.on('cart:remove', this.removeFromCart.bind(this));
        events.on('cart:clear', this.clearCart.bind(this));
        events.on('cart:total', this.calculateTotal.bind(this));
    }

    // Метод для добавления товара в корзину
    private addToCart(product: Product, quantity: number) {
        this.cart.addItem(product, quantity);
        this.cartView.displayCart(this.cart);
    }

    // Метод для удаления товара из корзины
    private removeFromCart(productId: string) {
        this.cart.removeItem(productId);
        this.cartView.displayCart(this.cart);
    }

    // Метод для очистки корзины
    private clearCart() {
        this.cart.clearCart();
        this.cartView.displayCart(this.cart);
    }

    // Метод для расчета общей стоимости товаров в корзине
    private calculateTotal() {
        const total = this.cart.calculateTotal();
        this.cartView.displayTotal(total);
    }
}

## OrderPresenter: управляет логикой представления для оформления заказа.
Обрабатывает процесс оформления заказа и передает данные в OrderView.
export class OrderPresenter {
    constructor(
        private orderView: OrderView,
        private customer: Customer,
        private cart: Cart
    ) {
        this.initialize();
    }

    // Инициализация событий
    private initialize() {
        events.on('order:submit', this.placeOrder.bind(this));
    }

    // Метод для оформления заказа
    private placeOrder(paymentMethod: string) {
        try {
            this.orderView.submitOrder(this.customer, this.cart, paymentMethod);
        } catch (error) {
            console.error("Order submission failed", error);
        }
    }
}

## Описание структуры базового кода, компонентов и моделей данных

Модели данных (Models)
## Product

id: string
name: string
description: string
price: number
category: string
image: string

## Customer

id: string
name: string
email: string
phone: string
address: string

## Cart

items: CartItem[]
totalAmount: number

## CartItem

product: Product
quantity: number

## Взаимодействие частей приложения
View компоненты взаимодействуют с Presenter для получения данных и отправки команд.
Presenter компоненты обрабатывают бизнес-логику и изменения состояния данных.
Models содержат данные и предоставляют их Presenter.

## Описание программного интерфейса компонентов

## ProductPresenter
loadProducts(): void
Загружает список продуктов и передает их в ProductView.

## CartPresenter
addToCart(product: Product, quantity: number): void
Добавляет продукт в корзину.
removeFromCart(productId: string): void
Удаляет продукт из корзины.
calculateTotal(): number
Рассчитывает общую стоимость товаров в корзине и передает данные в CartView.

## OrderPresenter
placeOrder(customer: Customer, cart: Cart, paymentMethod: string): void
Оформляет заказ, используя данные из корзины и выбранный способ оплаты, и передает данные в OrderView.