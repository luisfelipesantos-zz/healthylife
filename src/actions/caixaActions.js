import { ADD_CAIXA, GET_CAIXAS } from './actionTypes.js';
import { setCaixa } from './generalActions';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function addCaixa({ data }) {
    console.log('entrou no addCaixa')
    return (dispatch) => {
        return axios.post(`${apiUrl}/caixas`, { data })
            .then(res => {                
                dispatch(addCaixaSuccess(res.data));
                console.log('----------'+res.data.id)
                setCaixa({ caixaId: res.data.id })
            })
            .catch(err => {
                console.log('erro no addCaixa')
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
    console.log('entrou no getALLCAIXAS')
  return (dispatch) => {
    return axios.get(`${apiUrl}/caixas`)
      .then(res => {
        console.log('conseguiu')
        dispatch(getAllCaixasSuccess(res.data));
      })
      .catch(err => {
        console.log('não conseguiu')
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
