import {
  ADD_PRODUCT,
  GET_PRODUCTS,
  SET_TABLE,
  GET_INDICATIONS,
  ADD_INDICATION,
  GET_CONTRAINDICATIONS,
  ADD_CONTRAINDICATION,
  ADD_CATEGORY,
  GET_CATEGORIES,
  GET_OPERATORS,
  ADD_OPERATOR,
  EDIT_PRODUCTS,
  DELETE_PRODUCTS,
  GET_CAIXAS,
  ADD_CAIXA,
  ADD_COMPRA,
  GET_COMPRAS,
  ADD_ITEM,
  GET_ITENS,
  ADD_MOVIMENTO,
  GET_MOVIMENTOS,
  EDIT_MOVIMENTOS,
  ADD_PAGAMENTO,
  GET_PAGAMENTOS,
  SET_CAIXA,
  GET_ID_CAIXA,
  SET_MOVIMENTO,
  GET_ID_MOVIMENTO,
  SET_COMPRA,
  GET_ID_COMPRA,
  GET_TIPO_PAGAMENTOS,
  CLEAR_COMPRA_ID,
  CLEAR_ITENS,
  CLEAR_PAGAMENTOS,
  CLEAR_COMPRAS,
  GET_VENDAS
} from "../actions/actionTypes";

const initialState = {
  caixaId: null,
  movimentoId: null,
  compraId: null,
  products: [],
  indications: [],
  contraindications: [],
  categories: [],
  operators: [],
  tables: [],
  caixas: [],
  compras: [],
  itens: [],
  movimentos: [],
  pagamentos: [],
  tipospagamentos: [],
  vendas: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload.products],
      };

    case SET_TABLE:
      return {
        ...state,
        tables: action.payload,
      };

    case GET_INDICATIONS:
      return {
        ...state,
        indications: [...action.payload.indications],
      };

    case ADD_INDICATION: {
      return {
        ...state,
        indications: [...state.indications, action.payload.indications],
      };
    }

    case GET_CONTRAINDICATIONS:
      return {
        ...state,
        contraindications: [...action.payload.contraindications],
      };

    case ADD_CONTRAINDICATION: {
      return {
        ...state,
        contraindications: [
          ...state.contraindications,
          action.payload.contraindications,
        ],
      };
    }

    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.payload.categories],
      };

    case ADD_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, action.payload.categories],
      };
    }

    case GET_OPERATORS:
      return {
        ...state,
        operators: [...action.payload.operators],
      };

    case ADD_OPERATOR: {
      return {
        ...state,
        operators: [...state.operators, action.payload.operators],
      };
    }

    case EDIT_PRODUCTS: {
      const updatedProduct = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, ...action.payload };
        }
      });
      return {
        ...state,
        products: [...updatedProduct],
      };
    }

    case DELETE_PRODUCTS: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }

    case ADD_CAIXA: {
      return {
        ...state,
        caixas: [...state.operators, action.payload.caixas],
      };
    }

    case GET_CAIXAS: {
      return {
        ...state,
        caixas: [...action.payload.caixas],
      };
    }

    case ADD_COMPRA: {
      return {
        ...state,
        compras: [...state.operators, action.payload.compras],
      };
    }

    case GET_COMPRAS: {
      return {
        ...state,
        compras: [...action.payload.compras],
      };
    }

    case ADD_ITEM: {
      return {
        ...state,
        itens: [...state.itens, action.payload.itens],
      };
    }

    case GET_ITENS: {
      return {
        ...state,
        itens: [...action.payload.itens],
      };
    }

    case ADD_MOVIMENTO: {
      return {
        ...state,
        movimentos: [...state.operators, action.payload.movimentos],
      };
    }

    case GET_MOVIMENTOS: {
      return {
        ...state,
        movimentos: [...action.payload.movimentos],
      };
    }

    case EDIT_MOVIMENTOS: {
      const updatedPayment = state.movimentos.map((mov) => {
        if (mov.id === action.payload.id) {
          return { ...mov, ...action.payload };
        }
      });
      return {
        ...state,
        movimentos: [...updatedPayment],
      };
    }

    case ADD_PAGAMENTO: {
      return {
        ...state,
        pagamentos: [...state.operators, action.payload.caixas],
      };
    }

    case GET_PAGAMENTOS: {
      return {
        ...state,
        pagamentos: [...action.payload.pagamentos],
      };
    }

    case GET_TIPO_PAGAMENTOS: {
      return {
        ...state,
        tipospagamento: [...action.payload.tipospagamento],
      };
    }

    case SET_CAIXA: {
      return {
        ...state,
        caixaId: action.payload.caixa.caixaId,
      };
    }

    case GET_ID_CAIXA: {
      return {
        caixaId: state.caixaId,
      };
    }

    case SET_MOVIMENTO: {
      return {
        ...state,
        movimentoId: action.payload.movimento.movimentoId,
      };
    }

    case GET_ID_COMPRA: {
      return {
        compraId: state.compraId,
      };
    }

    case SET_COMPRA: {
      return {
        ...state,
        compraId: action.payload.compra.compraId,
      };
    }

    case CLEAR_COMPRA_ID: {
      return {
        ...state,
        compraId: null
      }
    }

    case CLEAR_COMPRAS: {
      return {
        ...state,
        compras: []
      }
    }

    case CLEAR_ITENS: {
      return {
        ...state,
        itens: []
      }
    }

    case CLEAR_PAGAMENTOS: {
      return {
        ...state,
        pagamentos: []
      }
    }

    case GET_VENDAS: {
      return {
        ...state,
        vendas: action.payload.vendas
      }
    }

    default:
      return state;
  }
}

export default rootReducer;
