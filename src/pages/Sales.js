import React, { Component } from "react";

import "../style/login.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  MdSearch,
  MdClose,
  MdPerson,
  MdAccessTime,
  MdToday,
  MdMonetizationOn,
  MdDone,
} from "react-icons/md";

import { getAllCaixas } from "../actions/caixaActions";

import "../style/sales.css";
import store from "../store";

import { getVendasFromCaixa } from "../actions/compraActions";

const mapStateToProps = (state) => {
  return {
    vendas: state.vendas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVendasFromCaixa: (idCaixa) => dispatch(getVendasFromCaixa(idCaixa)),
    getAllCaixas: () => dispatch(getAllCaixas()),
  };
};

class Sales extends Component {
  constructor(props) {
    super();

    this.state = {
      startDate: new Date(),
      hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
      saleslist: [],
    };

    this.availablecaixas = this.availablecaixas.bind(this);
    this.getHour = this.getHour.bind(this);
  }

  async availablecaixas(date) {
    if (date != null) {
      const caixas = store.getState().caixas;
      const todaydate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      let availablecaixas = caixas.filter((caixa) => {
        let caixadate = new Date(caixa.data);

        let formatedcaixadate = `${caixadate.getDate()}/${
          caixadate.getMonth() + 1
        }/${caixadate.getFullYear()}`;

        return todaydate == formatedcaixadate;
      });

      console.log(availablecaixas.length);

      if (availablecaixas.length != 0)
        await this.props.getVendasFromCaixa(availablecaixas[0].id);
      else await this.props.getVendasFromCaixa(0);

      const list = this.props.vendas.map((elem) => elem);
      const listmovid = this.props.vendas.map((elem) => elem.movid);
      this.setState({ saleslist: list });

      //aqui eu pego todos os movimentos disponíveis do dia
      const movs = listmovid.filter((elem, idx) => {
        return listmovid.indexOf(elem) == idx;
      });

      let salesbymov = [];

      //aqui eu consigo listar todas as vendas separadas em uma array para cada movimento
      movs.map(async (mov) => {
        salesbymov.push(list.filter((venda) => venda.movid == mov));
      });

      this.setState({ saleslist: [...salesbymov] });

      this.currentDate();
    }
  }

  async componentDidMount() {
    this.props.getVendasFromCaixa(0);
    await this.props.getAllCaixas();
    const today = new Date();
    this.getHour();

    let availablecaixas = this.availablecaixas(today);
  }

  getHour() {
    setInterval(() => {
      const now = new Date();

      this.setState({
        hour: `${now.getHours()}:${now.getMinutes()}`,
      });
    }, 60000);
  }

  currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  renderitems(sale) {
    return sale.map((item) => {
      return (
        <>
          <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.quantidade}&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
              {parseFloat(item.valor).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
          </tr>
        </>
      );
    });
  }

  rendersales(movimento, callback) {
    const complistid = movimento.map((vend) => vend.compid);

    const compras = complistid.filter(
      (compra, index) => complistid.indexOf(compra) == index
    );

    const itembysales = [];

    compras.map((compid) => {
      itembysales.push(
        movimento.filter((item) => {
          return item.compid == compid;
        })
      );
    });

    const movtotal = itembysales.reduce((curr, next) => {
      let discount = parseFloat(next[0].valorDesconto);
      console.log(
        "[-----]" + parseFloat(next[0].valorTotal),
        discount.toFixed(2)
      );
      return curr + parseFloat(next[0].valorTotal - discount.toFixed(2));
    }, 0);

    return callback({
      subtotal: movtotal,
      render: itembysales.map((sale) => (
        <>
          <tr>
            <th>
              <h3 className="compraheader">
                Valor:{" "}
                {parseFloat(sale[0].valorTotal).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </th>
            <th>
              <h3 className="compraheader">
                Desconto: {sale[0].valorDesconto}%
              </h3>
            </th>
          </tr>
          <tr>
            <td>
              <i>Cod</i>
            </td>
            <td>
              <i>Nome</i>
            </td>
            <td>
              <i>Qt</i>
            </td>
            <td>
              <i>Valor</i>
            </td>
          </tr>
          {this.renderitems(sale)}
          <br />
        </>
      )),
    });
  }

  render() {
    const saleslist = this.state.saleslist;

    let movsubtotal = 0;
    let total = 0;
    let listsales = "";

    if (saleslist.length == 0) {
      listsales = (
        <>
          <p>Ops! Nenhuma venda encontrada</p>
        </>
      );
    } else {
      listsales = saleslist.map((movimento) => {
        if (Array.isArray(movimento)) {
          return (
            <>
              <div className="mainrecordheader">
                <p className="movimentoLabel">
                  Movimento: {movimento[0].horaInicio} &nbsp;&nbsp; Operador:{" "}
                  {movimento[0].opnome}
                </p>
              </div>

              <div className="tablediv">
                <table className="tableVendas">
                  <tbody>
                    {this.rendersales(movimento, (res) => {
                      movsubtotal = res.subtotal;
                      total += movsubtotal;
                      return res.render;
                    })}
                  </tbody>
                </table>
                <h3 className="subtotalLabel">
                  Total:{" "}
                  {movsubtotal.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h3>
              </div>
            </>
          );
        } else {
        }
      });
    }

    return (
      <>
        <div id="salesheader">
          <Link to="/home">
            <img id="saleslogo" className="logo" alt="logo" src={logo} />
          </Link>
          <h1 id="salestitle">Vendas</h1>
          <h2 id="totalvalue">
            Total:{" "}
            {total.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </h2>
        </div>

        <div id="datepicker">
          <p id="dateLabel">Data:</p>
          <DatePicker
            id="datepickerInput"
            selected={this.state.startDate}
            onChange={(date) => {
              this.setState({ startDate: date });
              this.availablecaixas(date);
            }}
            dateFormat="dd/MM/yyyy"
            locale="pt-br"
          />
        </div>

        <div id="mainrecord">{listsales}</div>

        <footer id="footerSales">
          <div className="footerDiv">
            <p>LOJA VIDA SAUDAVEL PRODUTOS NATURAIS</p>
          </div>
          <div className="footerDiv">
            <MdPerson className="footerIcons" /> João Lucas
          </div>
          <div className="footerDiv">
            <MdAccessTime className="footerIcons" />
            {this.state.hour}
          </div>
          <div className="footerDiv">
            <MdToday className="footerIcons" />
            {this.currentDate()}
          </div>
        </footer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
