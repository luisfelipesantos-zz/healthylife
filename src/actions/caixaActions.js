import { ADD_CAIXA, GET_CAIXAS } from './actionTypes.js';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function addCaixa({ data }) {
    return (dispatch) => {
        return axios.post(`${apiUrl}/caixas`, { data })
            .then(res => {
                dispatch(addCaixaSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            })
    }
}

export function addCaixaSuccess(caixas) {
    return {
        type: ADD_CAIXA,
        payload: {
            caixas
        }
    }
}

export function getAllCaixas() {
  return (dispatch) => {
    return axios.get(`${apiUrl}/caixas`)
      .then(res => {
        dispatch(getAllCaixasSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      })
  };
};

export function getAllCaixasSuccess(caixas) {
    return {
        type: GET_CAIXAS,
        payload: {
            caixas
        }
    }
}
