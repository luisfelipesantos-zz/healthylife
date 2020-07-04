import {
  ADD_MOVIMENTO,
  GET_MOVIMENTOS,
  EDIT_MOVIMENTOS,
} from "./actionTypes.js";
import axios from "axios";

import { setMovimento } from "./generalActions";

require("dotenv/config");

const apiUrl = process.env.REACT_APP_API_URL;

export function addMovimento({ CaixaId, horaInicio, OperadorId }) {
  return (dispatch) => {
    return axios
      .post(`${apiUrl}/movimentoscaixa`, { CaixaId, horaInicio, OperadorId })
      .then((res) => {
        dispatch(addMovimentoSuccess(res.data));
        setMovimento({ movimentoId: res.data.id });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function addMovimentoSuccess(movimentos) {
  return {
    type: ADD_MOVIMENTO,
    payload: {
      movimentos,
    },
  };
}

export function getAllMovimentos() {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/movimentoscaixa`)
      .then((res) => {
        dispatch(getAllMovimentosSuccess(res.data));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function getAllMovimentosSuccess(movimentos) {
  return {
    type: GET_MOVIMENTOS,
    payload: {
      movimentos,
    },
  };
}

export function editMovimento({ id, horaFim }) {
  return async (dispatch) => {
    return await axios
      .put(`${apiUrl}/movimentoscaixa/${id}`, { id, horaFim })
      .then((res) => {
        console.log("deu certo no axios");
        dispatch(editMovimentoSuccess(res.data));
      })
      .catch((err) => {
        window.alert("NÃO deu certo no axios");
        throw err;
      });
  };
}

export function editMovimentoSuccess(movimento) {
  console.log("vai pro reducer");
  return {
    type: EDIT_MOVIMENTOS,
    payload: {
      id: movimento.id,
      horaFim: movimento.horaFim,
    },
  };
}
