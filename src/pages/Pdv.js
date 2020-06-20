import React, { Component } from "react";
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
import "../style/pdv.css";
import logo from "../images/logo.png";
import Modal from "react-bootstrap";
import { getAllProducts } from "../actions/productActions.js";
import { addCompra } from "../actions/compraActions";
import { addItem } from "../actions/itemActions";
import store from "../store";
import { browserHistory } from "react-router";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    addCompra: (compra) => dispatch(addCompra(compra)),
    addItem: (item) => dispatch(addItem(item)),
  };
};

class Pdv extends Component {
  componentDidMount() {
    if (
      store.getState().movimentoId == null ||
      store.getState().caixaId == null
    ) {
      this.props.history.push("/");
    }

    this.props.getAllProducts();
    this.getHour();
    this.currentDate();

    window.onclick = function (event) {
      if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
        document.getElementById("modalRecebido").value = "";
        document.getElementById("modalValor").value = "";
        document.getElementById("modalTroco").value = "";
      }
    };
  }

  constructor() {
    super();

    this.state = {
      prodCod: "",
      prodNome: "",
      prodPreco: "",
      prodSubtotal: "",
      prodQuantidade: "",
      prodTotal: 0,
      prodDesconto: 0,
      prodTotalDiscount: 0,
      autocompleteList: [],
      paymentValue: 0,
      paymentmethod: "DINHEIRO",
      paymentmethods: [
        {
          nome: "DINHEIRO",
        },
        {
          nome: "ELO DÉBITO",
        },
        {
          nome: "ELO CRÉDITO",
        },
        {
          nome: "MASTER CRÉDITO",
        },
        {
          nome: "MASTER DÉBITO",
        },
        {
          nome: "VISA CRÉDITO",
        },
        {
          nome: "VISA DÉBITO",
        },
        {
          nome: "TRANSFERÊNCIA BANCÁRIA",
        },
      ],
      listPayments: [],
      listItems: [],
      hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    this.getHour = this.getHour.bind(this);
    this.searchNameByCode = this.searchNameByCode.bind(this);
    this.calculateSubtotal = this.calculateSubtotal.bind(this);
    this.includeItem = this.includeItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.applyDiscount = this.applyDiscount.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.cancelPurchase = this.cancelPurchase.bind(this);
    this.openModal = this.openModal.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
    this.setpaymentValue = this.setpaymentValue.bind(this);
    this.setPaymentMethod = this.setPaymentMethod.bind(this);
    this.addPayment = this.addPayment.bind(this);
    this.finishPurchase = this.finishPurchase.bind(this);
    this.addItems = this.addItems.bind(this);
  }

  async addItems() {
    for (const item of this.state.listItems) {
      await this.props.addItem({
        ProdutoId: item.cod,
        CompraId: 1,
        quantidade: item.quantidade,
        valor: item.subtotal,
      });
    }
  }

  async createPurchase() {    
    await this.props.addCompra({
      MovimentoCaixaId: store.getState().movimentoId,
      valorTotal: this.state.prodTotal,
      valorDesconto: this.state.prodDesconto,
      dataHora: new Date(),
    });
  }

  async finishPurchase() {
    this.createPurchase();

    this.addItems();
  }

  openModal() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("modalValor").value = parseFloat(
      this.state.prodTotalDiscount
    )
      .toFixed(2)
      .replace(".", ",");

    this.setState({ paymentValue: this.state.prodTotalDiscount });
    document.getElementById("paymentmethods").focus();
  }

  currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  setpaymentValue(event) {
    this.setState({
      paymentValue: parseFloat(event.target.value.replace(",", ".")),
    });
  }

  setPaymentMethod(event) {
    this.setState({
      paymentmethod: event.target.value,
    });
  }

  addPayment() {
    console.log("ENTROU NO ADDPAYMENT");
    const { paymentmethod, paymentValue } = this.state;

    console.log(paymentmethod, paymentValue);

    if (paymentmethod !== "" && paymentValue !== 0) {
      console.log("ENTROU NA CONDIÇÃO");
      const newpayment = {
        paymentmethod: paymentmethod,
        paymentValue: paymentValue,
      };

      this.setState((state) => {
        const listpayments = state.listPayments.push(newpayment);
        return {
          listpayments,
          paymentValue: 0,
          paymentmethod: "DINHEIRO",
        };
      });

      document.getElementById("modalValor").value = "";
      document.getElementById("modalRecebido").value = "";
      document.getElementById("modalTroco").value = "";
      document.getElementById("paymentmethods").focus();
      document.getElementById("paymentmethods").selectedIndex = "0";
    }
  }

  getHour() {
    setInterval(() => {
      const now = new Date();

      this.setState({
        hour: `${now.getHours()}:${now.getMinutes()}`,
      });
    }, 60000);
  }

  applyDiscount(event) {
    let discount = event.target.value;
    if (discount == "" || discount == undefined) discount = "0";

    discount = (100 - parseFloat(discount.replace(",", "."))) / 100;

    this.setState((state) => {
      const finalValue = state.prodTotal * discount;

      return {
        prodTotalDiscount: finalValue,
      };
    });
  }

  calculateChange(event) {
    let receivedValue = parseFloat(event.target.value.replace(",", "."));
    let payValue = this.state.paymentValue;

    console.log("received: " + receivedValue);

    if (receivedValue >= this.state.paymentValue) {
      let change = document.getElementById("modalTroco");

      change.value = parseFloat(parseFloat(receivedValue) - payValue)
        .toFixed(2)
        .replace(".", ",");
      console.log(receivedValue - payValue);
    }
  }

  includeItem(event) {
    const {
      prodCod,
      prodNome,
      prodPreco,
      prodSubtotal,
      prodQuantidade,
    } = this.state;

    if (event.which === 13) {
      if ((prodCod, prodNome, prodPreco, prodSubtotal, prodQuantidade !== "")) {
        const newitem = {
          cod: prodCod,
          nome: prodNome,
          preco: prodPreco,
          subtotal: prodSubtotal,
          quantidade: prodQuantidade,
        };

        this.setState((state) => {
          const list = state.listItems.push(newitem);

          const parsedTotal = isNaN(state.prodTotal) ? 0 : state.prodTotal;
          const total = parseFloat(parsedTotal) + parseFloat(newitem.subtotal);

          return {
            list,
            prodCod: "",
            prodPreco: "",
            prodNome: "",
            prodQuantidade: "",
            prodSubtotal: "",
            prodTotal: total,
            prodTotalDiscount: total,
          };
        });

        let codInput = document.getElementById("pdvCodigo");
        let nameInput = document.getElementById("pdvProduto");
        codInput.value = "";
        nameInput.value = "";
        codInput.focus();
      } else {
        console.log("There is empty fields");
      }
    } else {
      console.log("Not Enter KeyCode");
    }
  }

  selectProduct(id) {
    let prodCodigo = document.getElementById("pdvCodigo");

    if (id !== undefined) {
      const produto = this.props.products.filter((prod) => prod.id == id);
      if (produto[0] !== undefined) {
        this.setState({
          prodNome: produto[0].nome,
          prodPreco: produto[0].preco,
          prodCod: produto[0].id,
        });
        prodCodigo.value = produto[0].id;
      } else {
        console.log("Nenhum produto encontrado");
        this.setState({
          prodNome: "",
          prodPreco: "",
          prodSubtotal: "",
          prodQuantidade: "",
          prodCod: "",
        });
        prodCodigo.value = "";
      }
    } else {
      console.log("nenhum produto encontrado");
      this.setState({
        prodNome: "",
        prodPreco: "",
        prodSubtotal: "",
        prodQuantidade: "",
        prodCod: "",
      });
      prodCodigo.value = "";
    }
  }

  cancelPurchase() {
    this.setState({
      prodCod: "",
      prodNome: "",
      prodPreco: "",
      prodSubtotal: "",
      prodQuantidade: "",
      prodTotal: 0,
      prodDesconto: 0,
      prodTotalDiscount: 0,
      listItems: [],
    });

    document.getElementById("pdvProduto").value = "";
    document.getElementById("pdvCodigo").value = "";
    document.getElementById("pdvDesconto").value = "";
  }

  searchByName(event) {
    let product = event.target.value;
    let products = this.props.products;

    const autocomplete = products.filter((prod) => {
      product = product.toLowerCase();
      let pName = prod.nome.toLowerCase();

      return pName.includes(product);
    });

    if (autocomplete.length === 1) {
      this.selectProduct(autocomplete[0].id);
    } else {
      this.selectProduct(undefined);
    }

    this.setState({ autocompleteList: autocomplete });
  }

  deleteItem(id) {
    this.setState((state) => {
      const updatedList = state.listItems.filter((item, key) => key !== id);
      const deletedItem = state.listItems.filter((item, key) => key === id);
      const total = state.prodTotal - deletedItem[0].subtotal;
      return {
        listItems: updatedList,
        prodTotal: total,
        prodTotalDiscount: total,
      };
    });
  }

  deletePayment(id) {
    this.setState((state) => {
      const listUpdated = state.listPayments.filter(
        (payment, key) => key !== id
      );

      console.log("LIST PAYMENT: " + listUpdated);
      return {
        listPayments: listUpdated,
      };
    });
  }

  searchNameByCode(event) {
    let prodName = document.getElementById("pdvProduto");

    if (event.target.value !== undefined) {
      const produto = this.props.products.filter(
        (prod) => prod.id == event.target.value
      );
      if (produto[0] !== undefined) {
        this.setState({
          prodNome: produto[0].nome,
          prodPreco: produto[0].preco,
          prodCod: produto[0].id,
        });
        prodName.value = produto[0].nome;
      } else {
        console.log("No products found");
        this.setState({
          prodNome: "",
          prodPreco: "",
          prodSubtotal: "",
          prodQuantidade: "",
          prodCod: "",
        });
        prodName.value = "";
      }
    } else {
      console.log("No products found");
      this.setState({
        prodNome: "",
        prodPreco: "",
        prodSubtotal: "",
        prodQuantidade: "",
        prodCod: "",
      });
      prodName.value = "";
    }
  }

  calculateSubtotal(event) {
    if (isNaN(event.target.value)) {
      console.log("Not a number");
      this.setState({ prodSubtotal: "", prodQuantidade: "" });
    } else {
      if (this.state.prodPreco !== "") {
        const subtotal = this.state.prodPreco * event.target.value;
        this.setState({
          prodSubtotal: subtotal,
          prodQuantidade: event.target.value,
        });
      }
    }
  }

  render() {
    const list = this.state.listItems;
    const listTable = list.map((item, key) => (
      <tr key={key}>
        <td>{item.cod}</td>
        <td>{item.nome}</td>
        <td>{item.quantidade}</td>
        <td>R${parseFloat(item.preco).toFixed(2).replace(".", ",")}</td>
        <td>R${parseFloat(item.subtotal).toFixed(2).replace(".", ",")}</td>
        <button className="listButton">
          <MdClose
            className="footerIcons"
            onClick={() => this.deleteItem(key)}
          />
        </button>
      </tr>
    ));

    const paylist = this.state.listPayments;
    console.log(paylist);
    const paymentListTable = paylist.map((payment, key) => (
      <tr key={key}>
        <td>{payment.paymentmethod}</td>
        <td>
          R${parseFloat(payment.paymentValue).toFixed(2).replace(".", ",")}
        </td>
        <button className="listButton" onClick={() => this.deletePayment(key)}>
          <MdClose className="footerIcons" />
        </button>
      </tr>
    ));

    const autocompleteList = this.state.autocompleteList;

    const listOptions = autocompleteList.map((opt, key) => (
      <option value={opt.nome}></option>
    ));

    const payments = this.state.paymentmethods;

    const paymentmethods = payments.map((paymeth) => (
      <option value={paymeth.nome}>{paymeth.nome}</option>
    ));

    return (
      <>
        <header>
          <img className="logo" alt="logo" src={logo} />
          <button className="pdvButton" onClick="#">
            <MdClose className="pdvIcons" />
            Fechar movimento
          </button>
          <button className="pdvButton" onClick="#">
            <MdSearch className="pdvIcons" />
            Pesquisar Produtos
          </button>
        </header>

        <div className="main">
          <aside className="leftAside">
            <div className="productDiv">
              <p className="prodInputLabel">Produto: </p>
              <input
                list="pdvAutoCompleteList"
                type="text"
                onChange={this.searchByName}
                id="pdvProduto"
              />

              <datalist id="pdvAutoCompleteList">{listOptions}</datalist>
            </div>
            <div className="detailsPurchase">
              <div class="detailsDiv">
                <p className="inputLabel">Código:</p>
                <input
                  type="text"
                  id="pdvCodigo"
                  onChange={this.searchNameByCode}
                />
              </div>

              <div class="detailsDiv">
                <p className="inputLabel">Quantidade:</p>
                <input
                  value={this.state.prodQuantidade}
                  type="text"
                  id="pdvQuantidade"
                  onKeyPress={this.includeItem}
                  onChange={this.calculateSubtotal}
                />
              </div>

              <div class="detailsDiv">
                <p className="inputLabel">Val. Unit. (R$):</p>
                <input
                  type="text"
                  id="pdvValorUnit"
                  onKeyPress={this.includeItem}
                  value={
                    this.state.prodPreco == ""
                      ? ""
                      : parseFloat(this.state.prodPreco)
                          .toFixed(2)
                          .replace(".", ",")
                  }
                />
              </div>

              <div class="detailsDiv">
                <p className="inputLabel">SubTotal (R$):</p>
                <input
                  type="text"
                  id="pdvTotal"
                  onKeyPress={this.includeItem}
                  value={
                    this.state.prodSubtotal == ""
                      ? ""
                      : parseFloat(this.state.prodSubtotal)
                          .toFixed(2)
                          .replace(".", ",")
                  }
                />
              </div>
            </div>
            <div className="itemsList">
              <div className="tableBox">
                <table className="pdvTable">
                  <tbody>
                    <tr>
                      <th>Cód</th>
                      <th>Nome</th>
                      <th>Qt.</th>
                      <th>Val. Unit.</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                    {listTable}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
          <aside className="rightAside">
            <h3 id="righttitle">Total a Pagar (R$)</h3>
            <input
              value={parseFloat(this.state.prodTotalDiscount)
                .toFixed(2)
                .replace(".", ",")}
              type="text"
              id="pdvTotalPagar"
            />

            <h3 id="righttitle">Desconto (%)</h3>
            <input type="text" id="pdvDesconto" onChange={this.applyDiscount} />

            <button onClick={this.openModal} className="receberButton">
              <MdMonetizationOn className="footerIcons" />
              Receber
            </button>
            <button onClick={this.cancelPurchase} className="cancelarButton">
              <MdClose className="footerIcons" />
              Cancelar Venda
            </button>
          </aside>
        </div>

        <div id="myModal" class="modal">
          <div class="modal-content">
            <div className="modalLeft">
              <h1 className="modalTitle">Recebimento</h1>

              <div>
                <p className="modalLabel">Tipo de pagamento:</p>
                <select id="paymentmethods" onChange={this.setPaymentMethod}>
                  {paymentmethods}
                </select>
              </div>

              <div className="modalTableBox">
                <table className="pdvTable">
                  <tbody>
                    <tr>
                      <th>Tipo de pagamento</th>
                      <th>Valor</th>
                      <th></th>
                    </tr>
                    {paymentListTable}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modalRight">
              <h1 className="modalTitle">
                {`Total: R$${parseFloat(this.state.prodTotalDiscount)
                  .toFixed(2)
                  .replace(".", ",")}`}
              </h1>

              <div>
                <p className="modalLabel">Valor (R$):</p>
                <input
                  type="text"
                  id="modalValor"
                  onChange={this.setpaymentValue}
                />
              </div>

              <div>
                <p className="modalLabel">Valor Recebido (R$):</p>
                <input
                  type="text"
                  id="modalRecebido"
                  onChange={this.calculateChange}
                />
              </div>

              <div>
                <p className="modalLabel">Troco (R$):</p>
                <input type="text" id="modalTroco" />
              </div>

              <button className="modalreceberButton" onClick={this.addPayment}>
                <MdMonetizationOn className="footerIcons" />
                Receber
              </button>

              <button
                className="modalreceberButton"
                onClick={this.finishPurchase}
              >
                <MdDone className="footerIcons" />
                Finalizar Venda
              </button>
            </div>
          </div>
        </div>

        <footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pdv);
