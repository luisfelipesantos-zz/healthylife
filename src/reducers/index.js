import { ADD_PRODUCT, GET_PRODUCTS } from '../actions/actionTypes';

const initialState = {
    products: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        
        case GET_PRODUCTS:
            return {
                ...state,
                products: [...action.payload.products]
            }
    
        default:
            return state;
    }
}

export default rootReducer;