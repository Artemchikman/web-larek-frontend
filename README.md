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


### Базовые компоненты

- **Api**: класс для взаимодействия с серверным API.
- **Component**: базовый класс для всех компонентов.
- **EventEmitter**: класс для управления событиями.
- **Model**: базовый класс для всех моделей данных.

### Общие компоненты

- **Basket**: компонент корзины.
- **ModalWindow**: компонент модального окна.
- **OrderForm**: компонент формы заказа.
- **SuccessModal**: компонент модального окна успешного заказа.

## Программный интерфейс компонентов и назначение каждой части

### Api

Класс для взаимодействия с серверным API. Основные методы:
- `get(uri: string)`: выполнение GET-запросов.
- `post(uri: string, data: object, method: ApiPostMethods)`: выполнение POST/PUT/DELETE-запросов.

### Component

Базовый класс для всех компонентов. Основные методы:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)`: переключение класса.
- `setDisabled(element: HTMLElement, state: boolean)`: установка состояния disabled.
- `setText(element: HTMLElement, value: string)`: установка текстового содержимого.
- `setImage(element: HTMLImageElement, src: string, alt?: string)`: установка изображения.
- `render(data?: Partial<T>)`: рендеринг компонента.

### EventEmitter

Класс для управления событиями. Основные методы:
- `on(event: EventName, callback: Subscriber)`: установка обработчика на событие.
- `off(event: EventName, callback: Subscriber)`: снятие обработчика с события.
- `emit(event: string, data?: object)`: инициирование события.

### Model

Базовый класс для всех моделей данных. Основные методы:
- `emitChanges(event: string, payload?: object)`: уведомление об изменениях модели.

## Типы данных

Приложение работает с различными типами данных, основными из которых являются:
- **ICard**: информация о карточке товара.
- **IOrderProposal**: предложение заказа.
- **IFormState**: состояние формы.

## Взаимодействие частей приложения

Компоненты взаимодействуют друг с другом через события и API. Например, `OrderForm` использует `EventEmitter` для отправки событий при изменении данных формы или ее отправке. `ModalWindow` слушает события и открывается или закрывается в зависимости от них.

## Паттерн проектирования (MVC) и распределение классов между слоями

Для данного проекта подходит паттерн MVC (Model-View-Controller). Распределение классов между слоями:

- **Model**:
  - `Model`
  - `AppData`

- **View**:
  - `Component`
  - `Basket`
  - `ModalWindow`
  - `OrderForm`
  - `SuccessModal`

- **Controller**:
  - `Api`
  - `EventEmitter`