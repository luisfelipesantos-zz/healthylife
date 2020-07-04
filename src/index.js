import React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Pdv from './pages/Pdv';
import Login from './pages/Login';
import Vendas from './pages/Sales';
import { Provider } from 'react-redux';
import store from './store';
import { addProduct } from './actions/productActions';
import { Route, BrowserRouter, Switch} from 'react-router-dom'

window.store = store;
window.addProduct = addProduct;

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Login} />
        <Route path='/home' component={Home} />
        <Route path='/pdv' component={Pdv} />
        <Route path='/vendas' component={Vendas} />
        <Route path='/cadastro'  component={Cadastro} />
      </Switch>
    </BrowserRouter>
    
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
