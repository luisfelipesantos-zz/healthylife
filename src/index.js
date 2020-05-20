import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Cadastro from './pages/Cadastro';
import { Provider } from 'react-redux';
import store from './store';
import { addProduct } from './actions/productActions';

window.store = store;
window.addProduct = addProduct;

render(
  <Provider store={store}>
    <Cadastro />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
