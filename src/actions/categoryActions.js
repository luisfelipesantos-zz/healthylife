import { ADD_CATEGORY, GET_CATEGORIES } from './actionTypes';
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