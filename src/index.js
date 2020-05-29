import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Cadastro from './pages/Cadastro';
import Pdv from './pages/Pdv';
import { Provider } from 'react-redux';
import store from './store';
import { addProduct } from './actions/productActions';

window.store = store;
window.addProduct = addProduct;

render(
  <Provider store={store}>
    <Pdv />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
