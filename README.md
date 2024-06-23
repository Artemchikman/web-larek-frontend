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
## Описание базовых классов

### ApiClient

Класс `ApiClient` обеспечивает взаимодействие с API. Его функции:

- `getProducts()`: получить список продуктов
- `getProduct(id: number)`: получить продукт по ID
- `getUser(id: number)`: получить пользователя по ID

### EventEmitter

Класс `EventEmitter` обеспечивает работу событий. Его функции:

- `on(event: string, handler: EventHandler)`: установить слушателя события
- `off(event: string, handler: EventHandler)`: снять слушателя события
- `emit(event: string, ...args: any[])`: вызвать слушателей при возникновении события

### ProductDetail

Класс `ProductDetail` отображает детали продукта. Его функции:

- `loadProduct()`: загрузить данные продукта
- `render()`: отобразить данные продукта