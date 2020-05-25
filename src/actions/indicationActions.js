import { ADD_INDICATION, GET_INDICATIONS } from './actionTypes';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function getAllIndications() {
    return (dispatch) => {
        return axios.get(`${apiUrl}/indicacoes`)
            .then(res => {
                dispatch(getAllIndicationsSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            });
    };
}

export function getAllIndicationsSuccess(indications) {
    return {
        type: GET_INDICATIONS,
        payload: {
            indications
        }
    }
}

export function addIndication({ nome }) {
    return (dispatch) => {
        return axios.post(`${apiUrl}/indicacoes`, { nome })
            .then(res => {
                dispatch(addIndicationSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            })
    }
}

export function addIndicationSuccess(indications) {
    return {
        type: ADD_INDICATION,
        payload: {
            indications
        }
    }
}