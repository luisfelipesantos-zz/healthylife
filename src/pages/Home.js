import React, { Component } from "react";
import "../style/cadastro.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addMovimento,
  getAllMovimentos,
} from "../actions/movimentoCaixaActions";
import { addCaixa, getAllCaixas } from "../actions/caixaActions";
import {
  getCaixa,
  getMovimento,
  setCaixa,
  setMovimento,
} from "../actions/generalActions";

import store from '../store';

const mapStateToProps = (state) => {
  return {
    movimentos: state.movimentos,
    caixas: state.caixas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addMovimento: (movimento) => dispatch(addMovimento(movimento)),
    addCaixa: (caixa) => dispatch(addCaixa(caixa)),
    getAllMovimentos: () => dispatch(getAllMovimentos()),
    getAllCaixas: () => dispatch(getAllCaixas()),
    getCaixa: () => dispatch(getCaixa()),
    setCaixa: (caixa) => dispatch(setCaixa(caixa)),
    setMovimento: (movimento) => dispatch(setMovimento(movimento)),
  };
};

class Home extends Component {
  componentDidMount() {
    this.props.getAllMovimentos();
    this.props.getAllCaixas();
  }

  constructor() {
    super();

    this.state = {
      caixaId: null,
      movimentoId: null,
    };

    this.verifyCashRegister = this.verifyCashRegister.bind(this);
  }

  verifyCashRegister() {
    const currDate = new Date();
    const cDate = `${currDate.getDate()}/${
      currDate.getMonth() + 1
    }/${currDate.getFullYear()}`;

    const openCaixas = this.props.caixas;

    openCaixas.filter((caixa) => {
      let date = new Date(caixa.data);
      let registerDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return registerDate == cDate;
    });

    if (openCaixas.length !== 0) {
      console.log('chegou aqui');
      this.props.setCaixa({ caixaId: openCaixas[0].id });
      this.openRegisterFlow();
    } else {
      this.props.addCaixa({
        data: new Date(),
      });
    }
  }

  openRegisterFlow() {
    console.log('-----------entrou')
    const mov = this.props.movimentos.filter((movimento) => {
      return movimento.horaFim == null;
    });

    if (mov.length !== 0) {
      this.props.setMovimento({ movimentoId: mov[0].id });
    } else {
      this.props.addMovimento({
        CaixaId: store.getState().caixaId,
        horaInicio: new Date(),
        OperadorId: 1,
        horaFim: null,
      }); // Colocar o operador que está logado na sessão
    }
  }

  render() {
    return (
      <div>
      <Link to='/pdv'>
        <button className="registerButton" onClick={this.verifyCashRegister}>
          Abrir movimento
        </button>
      </Link>
      </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
