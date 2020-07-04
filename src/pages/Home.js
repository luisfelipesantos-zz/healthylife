import React, { Component } from "react";
import "../style/cadastro.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addMovimento,
  getAllMovimentos,
} from "../actions/movimentoCaixaActions";
import {
  MdStore,
  MdExitToApp,
  MdInsertChart,
  MdEdit,
} from "react-icons/md";
import { addCaixa, getAllCaixas } from "../actions/caixaActions";
import {
  getCaixa,
  getMovimento,
  setCaixa,
  setMovimento,
} from "../actions/generalActions";
import logo from "../images/logo.png";

import store from "../store";

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
  async componentDidMount() {
    await this.props.getAllMovimentos();
    await this.props.getAllCaixas();

    console.log(this.openRegister());

    let caixaaberto = document.getElementById("caixaaberto");
    let movimentoaberto = document.getElementById("movimentoaberto");

    if (this.openRegister().length === 0) {
      caixaaberto.innerHTML = "Nenhum caixa aberto";
    } else {
      caixaaberto.innerHTML = await this.openRegister()[0].data;
    }

    let openMovs = await this.props.movimentos.filter((movimento) => {
      return movimento.horaFim == null;
    });

    if (openMovs.length === 0) {
      movimentoaberto.innerHTML = "Nenhum movimento aberto";
    } else {
      console.log(openMovs);
      movimentoaberto.innerHTML = openMovs[0].horaInicio;
    }
  }

  constructor() {
    super();

    this.state = {
      caixaId: null,
      movimentoId: null,
      hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    this.verifyCashRegister = this.verifyCashRegister.bind(this);
    this.openRegister = this.openRegister.bind(this);
  }

  currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  openRegister() {
    const currDate = new Date();
    const cDate = `${currDate.getDate()}/${
      currDate.getMonth() + 1
    }/${currDate.getFullYear()}`;

    let openCaixas = this.props.caixas;

    openCaixas = openCaixas.filter((caixa) => {
      let date = new Date(caixa.data);
      let registerDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      return registerDate === cDate;
    });

    return openCaixas;
  }

  verifyCashRegister() {
    let openCaixas = this.openRegister();

    if (openCaixas.length !== 0) {
      this.props.setCaixa({ caixaId: openCaixas[0].id });
      this.openRegisterFlow();
    } else {
      this.props.addCaixa({
        data: new Date(),
      });
    }
  }

  openRegisterFlow() {
    const mov = this.props.movimentos.filter((movimento) => {
      return movimento.horaFim == null;
    });

    if (mov.length !== 0) {
      this.props.setMovimento({ movimentoId: mov[0].id });
      console.log(mov[0]);
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
      <>
        <img id="homelogo" className="logo" alt="logo" src={logo} />
        <div id="centraldiv">
          <h1 id="boasvindas">Olá, João Lucas!</h1>
          <p id="openMovimento">
            Caixa aberto: <i id="caixaaberto">Nenhum caixa aberto</i>
            <br />
            <br />
            Movimento aberto:{" "}
            <i id="movimentoaberto">Nenhum movimento aberto</i>
          </p>
          <Link to="/pdv">
            <button id="abrirMovimento" onClick={this.verifyCashRegister}>
              <MdStore />
              Abrir movimento
            </button>
          </Link>
          <Link to="/vendas">
            <button id="vendas">
              <MdInsertChart />
              Vendas
            </button>
          </Link>
          <Link to="/cadastro">
            <button id="cadastros">
              <MdEdit />
              Cadastros
            </button>
          </Link>
          <button id="logout">
            <MdExitToApp />
            Logout
          </button>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
