import { ADD_PAGAMENTO, GET_PAGAMENTOS } from "./actionTypes.js";
import axios from "axios";
require("dotenv/config");

const apiUrl = process.env.REACT_APP_API_URL;

export function addPagamento({ TipoPagamentoId, CompraId, valor }) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/pagamentos`, {
        TipoPagamentoId,
        CompraId,
        valor,
      })
      .then((res) => {
        dispatch(addPagamentoSuccess(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function addPagamentoSuccess(pagamentos) {
  return {
    type: ADD_PAGAMENTO,
    payload: {
      pagamentos,
    },
  };
}

export function getAllPagamentos() {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/pagamentos`)
      .then((res) => {
        dispatch(getAllPagamentosSuccess(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function getAllPagamentosSuccess(pagamentos) {
  return {
    type: GET_PAGAMENTOS,
    payload: {
      pagamentos,
    },
  };
}
