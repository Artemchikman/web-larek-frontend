import './scss/styles.scss';

import { CartPresenter } from './components/base/presenters/CartPresenter';
import { CartView } from './components/base/views/CartView';

document.addEventListener('DOMContentLoaded', () => {
    const cartView = new CartView('cart-container');
    const cartPresenter = new CartPresenter(cartView.data);
    events.emit('cart:load');
});