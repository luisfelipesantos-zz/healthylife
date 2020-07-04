import { ADD_CONTRAINDICATION, GET_CONTRAINDICATIONS, EDIT_CONTRAINDICATIONS, DELETE_CONTRAINDICATIONS } from './actionTypes';
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

export function editContraIndication({ id, nome }) { 
  console.log(id) 
  return async (dispatch) => {
    return await axios.put(`${apiUrl}/contraindicacoes/${id}`, { id, nome })
      .then(res => {
        dispatch(editContraIndicationSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      });
  }
};

export function editContraIndicationSuccess(contra) { 
  return {
    type: EDIT_CONTRAINDICATIONS,
    payload: {
      id: contra.id,
      nome: contra.nome
    }
  };
};

export function deleteContraIndication(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/contraindicacoes/${id}`)
    .then(res => {
      dispatch(deleteContraIndicationSuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteContraIndicationSuccess(id) {
  return {
    type: DELETE_CONTRAINDICATIONS,
    payload: {
      id
    }
  };
};