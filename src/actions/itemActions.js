import { ADD_ITEM, GET_ITENS, DELETE_ITENS } from './actionTypes';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function getAllItems() {
  return (dispatch) => {
    return axios.get(`${apiUrl}/itens`)
      .then(res => {
        dispatch(getAllItemsSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      })
  };

};

export function getAllItemsSuccess(items) {
  return {
    type: GET_ITENS,
    payload: {
      items
    }
  }
}

export function addItem({ ProdutoId, CompraId, quantidade, valor }) {  
  return async (dispatch) => {
    return await axios.post(`${apiUrl}/itens`, { ProdutoId, CompraId, quantidade, valor })
      .then(res => {
        dispatch(addItemSuccess(res.data));
      })
      .catch(err => {
        console.log('ERRO AO ADICIONAR '+err);
      });
  }
};

export function addItemSuccess(items) {
  console.log('ITEMS: ' + items)
  return {
    type: ADD_ITEM,
    payload: {
      items
    }
  }
}

export function deleteItems(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/itens/${id}`)
    .then(res => {
      console.log('deletando item')
      dispatch(deleteItemsSuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteItemsSuccess(id) {
  return {
    type: DELETE_ITENS,
    payload: {
      id
    }
  };
};