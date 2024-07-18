// Импорт необходимых компонентов и типов
import { IFormState, IOrderForm } from './components/common/Order';
import { ProductPreview } from './components/Card';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/Events';
import { API_URL, CDN_URL } from './utils/constants';
import { WebLarekApi } from './components/LarekAPI';
import { AppData } from './/components//AppData';
import { ProductListItem } from './/components/Card';
import { Page } from './/components/Page';
import { ModalWindow, ConfirmationModal } from './/components/common/Modal';
import { ICard, IOrderProposal, IPaymentModifiedEvent } from './/types/index';
import { OrderForm } from './components/common/Order';
import { Basket, BasketItem } from './components/common/Basket';
import { ContactUsForm } from './components/Contacts';

// Инициализация эмиттера событий и данных приложения
const events = new EventEmitter();
const appData = new AppData({}, events);
const api = new WebLarekApi(CDN_URL, API_URL);

// Проверка наличия шаблонов элементов
const productCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const modalFrame = ensureElement<HTMLTemplateElement>('#modal-container') as HTMLElement;
const modal = new ModalWindow(events, modalFrame);

const viewWrapper = document.querySelector('.page') as HTMLElement; // Обертка для главной страницы
const page = new Page(viewWrapper, events); // Экземпляр страницы для управления представлениями

// Шаблоны для корзины и формы заказа
const shoppingBasketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const shoppingCartItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderFormLayout = ensureElement<HTMLTemplateElement>('#order');
const orderForm = new OrderForm(cloneTemplate(orderFormLayout), events);
const contactFormLayout = ensureElement<HTMLTemplateElement>('#contacts');
const contactsForm = new ContactUsForm(cloneTemplate(contactFormLayout), events);
const successDialogTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создание экземпляра корзины
const basket = new Basket(cloneTemplate(shoppingBasketTemplate), {
	onClick: () => {
		events.emit('order:open');
	}
});

// Инициализация ConfirmationModal один раз
const successWindow = new ConfirmationModal(
    cloneTemplate(successDialogTemplate),
    events
);

// Получение списка продуктов из API и сохранение в данных приложения
api.fetchProductList()
	.then((data) => {
		appData.cards = data;
	})
	.catch((err) => {
		console.log(err);
	});

// Изменилось одно из полей формы заказа
events.on(/^order\..*:change/, (data: { field: keyof IOrderForm; value: string }) => {
	appData.setOrderField(data.field, data.value);
});

// Изменилось одно из полей контактной формы
events.on(/^contacts\..*:change/, (data: { field: keyof IOrderForm; value: string }) => {
	appData.setContactsField(data.field, data.value);
});

// Обработка события: Когда изменяется список продуктов, обновляем представление каталога
events.on('productList:changed', () => {
	page.catalog = appData.cards.map((item) => {
		const card = new ProductListItem('card', cloneTemplate(productCardTemplate), {
			onClick: () => {
				events.emit('product:select', item);
			},
		});

		return card.render({
			id: item.id,
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

// Обработка события открытия формы заказа
events.on('order:open', () => {
    if (appData.getBasket().length) {
        const initialState: Partial<IOrderProposal> & IFormState = {
            valid: false,
            errors: [],
            address: '',
        };

        modal.render({ content: orderForm.render(initialState) });
        events.emit('modal:open', { windowType: 'orderForm' });
    }
});

// Обработка события: Открытие корзины
events.on('basket:open', () => {
	appData.setOrderField('items', []);
	appData.setOrderField('total', 0);

	const basketContents = appData.getBasket(); // Получение элементов корзины
	const cardBasketElements = basketContents.map((item, index) => {
		const cardBasketElement = cloneTemplate(shoppingCartItemTemplate);
		const cardBasket = new BasketItem(cardBasketElement, {
			onClick: () => events.emit('basketItem:remove', item),
		});
		cardBasket.index = index + 1;
		cardBasket.title = item.title;
		cardBasket.price = item.price;
		return cardBasketElement;
	});

	// Отключение кнопки, если корзина пуста
	if (appData.getBasket().length === 0) {
		basket.buttonDisable(true);
	}
	const totalPrice = basketContents.reduce(
		(total, item) => total + (item.price || 0),
		0
	);
	appData.setOrderField('total', totalPrice);
	basket.items = cardBasketElements;
	basket.total = totalPrice;
	modal.render({ content: basket.render() });
});

// Обработка события: Когда продукт добавлен в корзину
events.on('product:added', (item: ICard) => {
	appData.addCardToBasket(item);
	page.counter = appData.getBasket().length;
	modal.close();
});

// Обработка события: Когда продукт выбран, показываем предпросмотр продукта
events.on('product:select', (item: ICard) => {
	const productPreviewItem = new ProductPreview('card', cloneTemplate(productPreviewTemplate), {
		onClick: () => {
			events.emit('product:added', item);
		},
	});
	modal.render({ content: productPreviewItem.render(item) });
	// Отключение кнопки, если продукт недоступен или уже в корзине
	if (item.price === null || item.price === undefined) {
		productPreviewItem.buttonDisable(true);
		productPreviewItem.button = 'Недоступно к покупке';
	} else if (appData.getBasket().some((basketItem) => basketItem.id === item.id)) {
		productPreviewItem.buttonDisable(true);
		productPreviewItem.button = 'Уже в корзине';
	}
});
// Обработка события: Удаление элемента из корзины
events.on('basketItem:remove', (item: ICard) => {
	appData.removeCardFromBasket(item);
	page.counter = appData.getBasket().length;
	events.emit('basket:open', item);
});
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address, email, phone } = errors;
	orderForm.valid = !address;
	orderForm.errors = Object.values({ address, phone, email })
		.filter((i) => !!i)
		.join('; ');
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ address, phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Обработка изменений способа оплаты наличными
events.on('paymentCash:changed', (payment: IPaymentModifiedEvent) => {
	appData.setOrderField('payment', payment.method);
});

// Обработка изменений способа оплаты онлайн
events.on('paymentOnline:changed', (payment: IPaymentModifiedEvent) => {
	appData.setOrderField('payment', payment.method);
});

// Обработка события отправки формы заказа
events.on('orderForm:submit', () => {
    const initialState: Partial<IOrderProposal> & IFormState = {
        valid: false,
        errors: [],
        email: '',
        phone: '',
    };
    modal.render({ content: contactsForm.render(initialState) });
    events.emit('modal:open', { windowType: 'contactsForm' });
});

// Обработка события закрытия модального окна успеха
events.on('modalSucces:close', () => {
	modal.close();
});

// Обработка события открытия модального окна
events.on('modal:open', (data?: { windowType: string }) => {
    if (data && data.windowType) {
        if (data.windowType === 'orderForm') {
            orderForm.toggleButtonState();
        } else if (data.windowType === 'contactsForm') {
            contactsForm.updateButtonState();
        }
    }
    page.locked = true;
});

// Обработка события закрытия модального окна
events.on('modal:close', () => {
	page.locked = false;
});

// Обработка события отправки контактной формы
events.on('contactsForm:submit', () => {
    const basketArray = appData.getBasket();
    basketArray.forEach((item) => {
        appData.setOrderField('items', [...appData.order.items, item.id]);
    });
    api.postOrder(appData.order as IOrderProposal)
        .then((res) => {
            successWindow.description = `Списано: ${res.total} синапсов`;
            modal.render({ content: successWindow.render() });
            console.log(res);

            appData.clearBasket();
            page.counter = appData.getBasket().length;
            orderForm.clearOrderForm();
            contactsForm.clearOrderForm();
        })
        .catch((err) => {
            console.log(err);
        });
});