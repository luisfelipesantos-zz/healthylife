import { ADD_OPERATOR, GET_OPERATORS, EDIT_OPERATORS, DELETE_OPERATORS } from './actionTypes';
import axios from 'axios';
require('dotenv/config');

const apiUrl = process.env.REACT_APP_API_URL;

export function getAllOperators() {
    return (dispatch) => {
        return axios.get(`${apiUrl}/operadores`)
            .then(res => {
                dispatch(getAllOperatorsSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            });
    };
}

export function getAllOperatorsSuccess(operators) {
    return {
        type: GET_OPERATORS,
        payload: {
            operators
        }
    }
}

export function addOperator({ nome }) {
    return (dispatch) => {
        return axios.post(`${apiUrl}/operadores`, { nome })
            .then(res => {
                dispatch(addOperatorSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            })
    }
}

export function addOperatorSuccess(operators) {
    return {
        type: ADD_OPERATOR,
        payload: {
            operators
        }
    }
}


export function editOperator({ id, nome }) { 
  return async (dispatch) => {
    return await axios.put(`${apiUrl}/operadores/${id}`, { id, nome })
      .then(res => {
        dispatch(editOperatorSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      });
  }
};

export function editOperatorSuccess(operator) { 
  return {
    type: EDIT_OPERATORS,
    payload: {
      id: operator.id,
      nome: operator.nome
    }
  };
};

export function deleteOperator(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/operadores/${id}`)
    .then(res => {
      dispatch(deleteOperatorSuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteOperatorSuccess(id) {
  return {
    type: DELETE_OPERATORS,
    payload: {
      id
    }
  };
};