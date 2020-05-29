import {
    ADD_PRODUCT, GET_PRODUCTS, SET_TABLE, GET_INDICATIONS, ADD_INDICATION, GET_CONTRAINDICATIONS,
    ADD_CONTRAINDICATION, ADD_CATEGORY, GET_CATEGORIES, GET_OPERATORS, ADD_OPERATOR, EDIT_PRODUCTS, DELETE_PRODUCTS
} from '../actions/actionTypes';

const initialState = {
    products: [],
    indications: [],
    contraindications: [],
    categories: [],
    operators: [],
    tables: []
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

        case SET_TABLE:
            return {
                ...state,
                tables: action.payload
            }

        case GET_INDICATIONS:
            return {
                ...state,
                indications: [...action.payload.indications]
            }

        case ADD_INDICATION: {
            return {
                ...state,
                indications: [...state.indications, action.payload.indications]
            }
        }

        case GET_CONTRAINDICATIONS:
            return {
                ...state,
                contraindications: [...action.payload.contraindications]
            }

        case ADD_CONTRAINDICATION: {
            return {
                ...state,
                contraindications: [...state.contraindications, action.payload.contraindications]
            }
        }

        case GET_CATEGORIES:
            return {
                ...state,
                categories: [...action.payload.categories]
            }

        case ADD_CATEGORY: {
            return {
                ...state,
                categories: [...state.categories, action.payload.categories]
            }
        }

        case GET_OPERATORS:
            return {
                ...state,
                operators: [...action.payload.operators]
            }

        case ADD_OPERATOR: {
            return {
                ...state,
                operators: [...state.operators, action.payload.operators]
            }
        }

        case EDIT_PRODUCTS: {
            const updatedProduct = state.products.map( product => {
                if(product.id === action.payload.id) {
                    return {...product, ...action.payload}
                }
            });
            return {
                ...state,
                products: [...updatedProduct]
            };
        }

        case DELETE_PRODUCTS: {
            return {
                ...state,
                products: state.products
                    .filter(product => product.id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}

export default rootReducer;