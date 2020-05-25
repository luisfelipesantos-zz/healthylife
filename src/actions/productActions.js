import { ADD_PRODUCT, GET_PRODUCTS } from './actionTypes';
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
  return (dispatch) => {    
    return axios.post(`${apiUrl}/produtos`, { nome, preco, descricao })
      .then(res => {
        
        dispatch(addProductSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      })
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