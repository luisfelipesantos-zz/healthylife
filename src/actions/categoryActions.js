import { ADD_CATEGORY, GET_CATEGORIES, EDIT_CATEGORIES, DELETE_CATEGORIES } from './actionTypes';
import axios from 'axios';
require('dotenv/config');
 
const apiUrl = process.env.REACT_APP_API_URL;

export function getAllCategories() {
    return (dispatch) => {
        return axios.get(`${apiUrl}/categorias`)
            .then(res => {
                dispatch(getAllCategoriesSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            });
    };
}

export function getAllCategoriesSuccess(categories) {
    return {
        type: GET_CATEGORIES,
        payload: {
            categories
        }
    }
}

export function addCategory({ nome }) {
    return (dispatch) => {
        return axios.post(`${apiUrl}/categorias`, { nome })
            .then(res => {
                dispatch(addCategoriesSuccess(res.data));
            })
            .catch(err => {
                throw (err);
            })
    }
}

export function addCategoriesSuccess(categories) {
    return {
        type: ADD_CATEGORY,
        payload: {
            categories
        }
    }
}

export function editCategory({ id, nome }) { 
  return async (dispatch) => {
    return await axios.put(`${apiUrl}/categorias/${id}`, { id, nome })
      .then(res => {
        dispatch(editCategoriesSuccess(res.data));
      })
      .catch(err => {
        throw (err);
      });
  }
};

export function editCategoriesSuccess(category) { 
  return {
    type: EDIT_CATEGORIES,
    payload: {
      id: category.id,
      nome: category.nome
    }
  };
};

export function deleteCategory(id) {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/categorias/${id}`)
    .then(res => {
      dispatch(deleteCategorySuccess(res.data));
    })
    .catch(err => {
      throw(err);
    });
  };
};

export function deleteCategorySuccess(id) {
  return {
    type: DELETE_CATEGORIES,
    payload: {
      id
    }
  };
};