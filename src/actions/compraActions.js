import { ADD_COMPRA, GET_COMPRAS, GET_VENDAS } from "./actionTypes.js";
import axios from "axios";
import { setCompra } from '../actions/generalActions';
require("dotenv/config");

const apiUrl = process.env.REACT_APP_API_URL;

export function addCompra({
  MovimentoCaixaId,
  valorTotal,
  valorDesconto,
  dataHora,
}) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/compras`, {
        MovimentoCaixaId,
        valorTotal,
        valorDesconto,
        dataHora,
      })
      .then((res) => {
        dispatch(addCompraSuccess(res.data));
        dispatch(setCompra({ compraId: res.data.id }));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function addCompraSuccess(compras) {
  return {
    type: ADD_COMPRA,
    payload: {
      compras
    },
  };
}

export function getAllCompras() {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/compras`)
      .then((res) => {
        dispatch(getAllComprasSuccess(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function getAllComprasSuccess(compras) {
  return {
    type: GET_COMPRAS,
    payload: {
      compras
    },
  };
}

export function getVendasFromCaixa(idCaixa) {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/comprasCaixa/${idCaixa}`)
      .then((res) => {
        dispatch(getVendasFromCaixaSuccess(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function getVendasFromCaixaSuccess(vendas) {
  return {
    type: GET_VENDAS,
    payload: {
      vendas
    },
  };
}
