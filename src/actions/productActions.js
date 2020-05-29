import { ADD_PRODUCT, GET_PRODUCTS, EDIT_PRODUCTS, DELETE_PRODUCTS } from './actionTypes';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function getAllProducts() {
  return (dispatch) => {
    return axios.get(`${apiUrl}/produtos`)
      .then(res => {
        dispatch(getAllProductsSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      })
  };

};

export function getAllProductsSuccess(products) {
  return {
    type: GET_PRODUCTS,
    payload: {
      products
    }
  }
}

export function addProduct({ nome, preco, descricao }) {  
  return async (dispatch) => {
    return await axios.post(`${apiUrl}/produtos`, { nome, preco, descricao })
      .then(res => {
        dispatch(addProductSuccess(res.data));
      })
      .catch(err => {
        console.log('ERRO AO ADICIONAR '+err);
      });
  }
};

export function addProductSuccess(products) {
  return {
    type: ADD_PRODUCT,
    payload: {
      products
    }
  }
}

export async function editProduct({ id, nome, preco, descricao}) {  
  return async (dispatch) => {
    return await axios.put(`${apiUrl}/produtos/${id}`, { id, nome, preco, descricao })
      .then(res => {
        console.log('deu certo no axios')
        dispatch(editProductSuccess(res.data));
      })
      .catch(err => {
        window.alert('NÃO deu certo no axios')
        throw (err);
      });
  }
};

export function editProductSuccess(product) { 
  console.log('vai pro reducer');
  return {
    type: EDIT_PRODUCTS,
    payload: {
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      descricao: product.descricao
    }
  };
};

export function deleteProduct(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/produtos/${id}`)
    .then(res => {
      console.log('deletando product')
      dispatch(deleteProductSuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteProductSuccess(id) {
  return {
    type: DELETE_PRODUCTS,
    payload: {
      id
    }
  };
};