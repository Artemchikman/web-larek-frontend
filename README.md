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

 Customer: представляет данные покупателя.

 Cart: представляет корзину покупок.
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

## CartPresenter: управляет логикой представления для корзины покупок и взаимодействий с ней.
Добавляет и удаляет товары из корзины.
Рассчитывает общую стоимость товаров в корзине и передает данные в CartView.

## OrderPresenter: управляет логикой представления для оформления заказа.
Обрабатывает процесс оформления заказа и передает данные в OrderView.

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