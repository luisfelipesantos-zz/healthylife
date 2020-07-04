import { ADD_INDICATION, GET_INDICATIONS, EDIT_INDICATIONS, DELETE_INDICATIONS } from './actionTypes';
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

export function editIndication({ id, nome }) { 
  console.log(id) 
  return async (dispatch) => {
    return await axios.put(`${apiUrl}/indicacoes/${id}`, { id, nome })
      .then(res => {
        dispatch(editIndicationSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      });
  }
};

export function editIndicationSuccess(indication) { 
  return {
    type: EDIT_INDICATIONS,
    payload: {
      id: indication.id,
      nome: indication.nome
    }
  };
};

export function deleteIndication(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/indicacoes/${id}`)
    .then(res => {
      dispatch(deleteIndicationSuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteIndicationSuccess(id) {
  return {
    type: DELETE_INDICATIONS,
    payload: {
      id
    }
  };
};