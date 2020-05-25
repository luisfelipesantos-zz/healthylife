import { ADD_CONTRAINDICATION, GET_CONTRAINDICATIONS } from './actionTypes';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function getAllContraIndications() {
    return (dispatch) => {
        return axios.get(`${apiUrl}/contraindicacoes`)
            .then(res => {
                dispatch(getAllContraIndicationsSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            });
    };
}

export function getAllContraIndicationsSuccess(contraindications) {
    return {
        type: GET_CONTRAINDICATIONS,
        payload: {
            contraindications
        }
    }
}

export function addContraIndication({ nome }) {
    return (dispatch) => {
        return axios.post(`${apiUrl}/contraindicacoes`, { nome })
            .then(res => {
                dispatch(addContraIndicationSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            })
    }
}

export function addContraIndicationSuccess(contraindications) {
    return {
        type: ADD_CONTRAINDICATION,
        payload: {
            contraindications
        }
    }
}