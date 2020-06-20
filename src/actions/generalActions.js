import {
  SET_TABLE,
  GET_ID_CAIXA,
  SET_CAIXA,
  GET_ID_MOVIMENTO,
  SET_MOVIMENTO,
  SET_COMPRA,
  GET_ID_COMPRA
} from "./actionTypes";

export function setTable(table) {
  return {
    type: SET_TABLE,
    payload: {
      table,
    },
  };
}

export function setCaixa(caixa) {
  return {
    type: SET_CAIXA,
    payload: {
      caixa,
    },
  };
}

export function getCaixa(caixa) {
  return {
    type: GET_ID_CAIXA,
    payload: {
      caixa,
    },
  };
}

export function setMovimento(movimento) {
  return {
    type: SET_MOVIMENTO,
    payload: {
      movimento,
    },
  };
}

export function getMovimento(movimento) {
  return {
    type: GET_ID_MOVIMENTO,
    payload: {
      movimento,
    },
  };
}

export function setCompra(compra) {
  return {
    type: SET_COMPRA,
    payload: {
      compra,
    }
  }
}

export function getCompra(compra) {
  return {
    type: GET_ID_COMPRA,
    payload: {
      compra,
    }
  }
}
