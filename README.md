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


## Проект состоит из следующих основных частей:

src - корневая папка исходного кода.
common.blocks - общие блоки и стили.
components - компоненты приложения.
models - модели данных.
## Компоненты и их интерфейс

## Api.ts
Api - базовый класс для работы с API.
 ## Методы:
get(uri: string): выполняет GET запрос.
post(uri: string, data: object, method: ApiPostMethods = 'POST'): выполняет POST запрос.

## Components.ts 
Component<T> - абстрактный базовый класс для компонентов.
Методы:
toggleClass(element: HTMLElement, className: string, force?: boolean): переключает класс.
setText(element: HTMLElement, value: string): устанавливает текстовое содержимое.
setDisabled(element: HTMLElement, state: boolean): изменяет состояние блокировки элемента.
setHidden(element: HTMLElement): скрывает элемент.
setVisible(element: HTMLElement): отображает элемент.
setImage(el: HTMLImageElement, src: string, alt?: string): устанавливает изображение с альтернативным текстом.
render(data?: Partial<T>): рендерит компонент.

## Events.ts
EventEmitter - класс для работы с событиями.
Методы:
on<T extends object>(event: EventName, callback: (data: T) => void): подписывается на событие.
emit<T extends object>(event: string, data?: T): испускает событие.

## Model.ts
Model<T> - базовая модель данных.
Методы:
emitChanges(event: string, payload?: object): испускает изменения.

## Form.ts
Form<T> - класс для работы с формами.
Методы:
onInputChange(field: keyof T, value: string): обработка изменения ввода.
render(state: Partial<T> & IFormState): рендерит форму.

## Modal.ts
Modal - класс для работы с модальными окнами.
Методы:
open(): открывает модальное окно.
close(): закрывает модальное окно.
render(data: IModalData): рендерит модальное окно.

## AppData.ts

## Product - класс для работы с продуктами.
Методы:
addToBasket(value: Product): добавляет продукт в корзину.
deleteFromBasket(id: string): удаляет продукт из корзины.
clearBasket(): очищает корзину.
setItems(): устанавливает элементы заказа.
setOrderField(field: keyof IOrderForm, value: string): устанавливает поле заказа.
validateContacts(): проверяет корректность контактной информации.
validateOrder(): проверяет корректность заказа.
refreshOrder(): обновляет заказ.
getTotalBasketPrice(): получает общую цену корзины.
setStore(items: IProduct[]): устанавливает магазинные товары.
resetSelected(): сбрасывает выбор товаров.

## Basket.ts

## Basket - класс для работы с корзиной.
Методы:
set price(price: number): устанавливает цену корзины.
set list(items: HTMLElement[]): устанавливает список товаров.
disableButton(): отключает кнопку "Оформить".
refreshIndices(): обновляет индексы товаров в корзине.

## Card.ts

## Card - класс для работы с карточками товаров.
Методы:
set id(value: string): устанавливает ID.
set title(value: string): устанавливает название.
set image(value: string): устанавливает изображение.
set selected(value: boolean): устанавливает состояние выбора.
set price(value: number | null): устанавливает цену.
set category(value: CategoryType): устанавливает категорию.


## Типы данных

IOrder - интерфейс для заказа.
IProduct - интерфейс для продукта.
FormErrors - интерфейс для ошибок формы.
IOrderForm - интерфейс для формы заказа.
IAppState - интерфейс для состояния приложения.

## Взаимодействие частей приложения

## Приложение использует паттерн проектирования MVC (Model-View-Controller):

## Model (Модель)
Product - модель продукта.
AppState - модель состояния приложения.

## View (Представление)
Component - базовый класс для всех представлений.
Form - представление формы.
Modal - представление модального окна.
Basket - представление корзины.
Card - представление карточки товара.

## Controller (Контроллер)
EventEmitter - контроллер для обработки событий.

Каждая часть приложения взаимодействует через события и общие данные. Модель содержит данные и бизнес-логику, представление отображает данные и получает пользовательский ввод, а контроллер управляет потоком данных и обновлением представлений.