import './scss/styles.scss';
import { Page } from './components/Page';
import { Api, ApiListResponse } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/common/Modal';
import { StoreItem, StoreItemPreview } from './components/Card';
import { AppState, Product } from './components/AppData';
import { provideElement, cloneTemplate } from './utils/utils';
import { ApiResponse, IOrderForm, IProduct } from './types';
import { API_URL } from './utils/constants';
import { Basket, StoreItemBasket } from './components/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/OrderSuccess';

const api = new Api(API_URL); // Создание экземпляра API с указанием URL
const events = new EventEmitter(); // Создание экземпляра EventEmitter для управления событиями

// Инициализация всех шаблонов компонентов
const storeProductTemplate =
provideElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = provideElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = provideElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = provideElement<HTMLTemplateElement>('#basket');
const orderTemplate = provideElement<HTMLTemplateElement>('#order');
const contactsTemplate = provideElement<HTMLTemplateElement>('#contacts');
const successTemplate = provideElement<HTMLTemplateElement>('#success')

 // Создание состояния приложения
const appData = new AppState({}, events);

// Создание экземпляра страницы
const page = new Page(document.body, events);

// Создание модального окна
const modal = new Modal(provideElement<HTMLElement>('#modal-container'), events);

// Инициализация переиспользуемых компонентов
const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const order = new Order('order', cloneTemplate(orderTemplate), events)
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {
  onClick: () => {
    events.emit('modal:close')
    modal.close()
  }
})

// Получение списка товаров с сервера
api.get('/product').then((res: ApiResponse) => {
    appData.setStore(res.items as IProduct[]);
  })
  .catch((err) => {
    console.error(err);
  });

// Обработка изменения элементов каталога
events.on('items:changed', () => {
  page.store = appData.store.map((item) => {
    const product = new StoreItem(cloneTemplate(storeProductTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return product.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  });
});

// Открытие карточки товара
events.on('card:select', (item: Product) => {
  page.locked = true;
  const product = new StoreItemPreview(cloneTemplate(cardPreviewTemplate), {
    onClick: () => {
      events.emit('card:toBasket', item)
    },
  });
  modal.render({
    content: product.render({
      id: item.id,
      title: item.title,
      image: item.image,
      category: item.category,
      description: item.description,
      price: item.price,
      selected: item.selected
    }),
  });
});

// Добавление товара в корзину
events.on('card:toBasket', (item: Product) => {
  item.selected = true;
  appData.addToBasket(item);
  page.counter = appData.getBasketAmount();
  modal.close();
})

// Открытие корзины
events.on('basket:open', () => {
  page.locked = true
  const basketItems = appData.basket.map((item, index) => {
    const storeItem = new StoreItemBasket(
      'card',
      cloneTemplate(cardBasketTemplate),
      {
        onClick: () => events.emit('basket:delete', item)
      }
    );
    return storeItem.render({
      title: item.title,
      price: item.price,
      index: index + 1,
    });
  });
  modal.render({
    content: basket.render({
      list: basketItems,
      price: appData.getTotalBasketPrice(),
    }),
  });
});

// Удаление товара из корзины
events.on('basket:delete', (item: Product) => {
  appData.deleteFromBasket(item.id);
  item.selected = false;
  basket.price = appData.getTotalBasketPrice();
  page.counter = appData.getBasketAmount();
  basket.refreshIndices();
  if (!appData.basket.length) {
    basket.disableButton();
  }
})

// Оформление заказа
events.on('basket:order', () => {
  modal.render({
    content: order.render(
      {
        address: '',
        valid: false,
        errors: []
      }
    ),
  });
});

// Изменение состояния валидации заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { payment, address } = errors;
  order.valid = !payment && !address;
  order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Изменение состояния валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Изменение введенных данных в форме заказа
events.on('orderInput:change', (data: { field: keyof IOrderForm, value: string }) => {
  appData.setOrderField(data.field, data.value);
});

// Заполнение телефона и почты для заказа
events.on('order:submit', () => {
  appData.order.total = appData.getTotalBasketPrice()
  appData.setItems();
  modal.render({
    content: contacts.render(
      {
        valid: false,
        errors: []
      }
    ),
  });
})

// Покупка товаров
// Обработка покупки товаров
events.on('contacts:submit', () => {
  api.post('/order', appData.order)
    .then((res) => {
      events.emit('order:success', res);
      appData.clearBasket();
      appData.refreshOrder();
      order.disableButtons();
      page.counter = 0;
      appData.resetSelected();
    })
    .catch((err) => {
      console.log(err)
    })
})

// Окно успешной покупки
events.on('order:success', (res: ApiListResponse<string>) => {
  modal.render({
    content: success.render({
      description: res.total
    })
  })
})

// Закрытие модального окна
events.on('modal:close', () => {
  page.locked = false;
  appData.refreshOrder();
});