import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} from "../../actions/productActions";
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = (state) => {
  return { products: state.products };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (product) => dispatch(addProduct(product)),
    getAllProducts: () => dispatch(getAllProducts()),
    editProduct: (product) => dispatch(editProduct(product)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
  };
};

class FormProduto extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  constructor() {
    super();

    this.state = {
      id: null,
      nome: "",
      preco: 0,
      descricao: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(product) {
    this.setState({
      id: product.id,
      nome: product.nome,
      preco: product.preco,
      descricao: product.descricao,
    });
  }

  async handleDelete(id) {
    await this.props.deleteProduct(id);
    await this.props.getAllProducts();

    this.setState({
      nome: "",
      preco: 0,
      descricao: "",
    });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    });

    console.log(this.state.nome);
  }

  async handleSubmit(event) {
     event.preventDefault();
    const { id, nome, preco, descricao } = this.state;
    if (id !== null) {
      await this.props.editProduct({ id, nome, preco, descricao });
      await this.props.getAllProducts();
    } else {
      await this.props.addProduct(this.state);
      await this.props.getAllProducts();
    }

    this.setState({
      nome: "",
      preco: 0,
      descricao: "",
    });
  }

  render() {
    const { products } = this.props;
    let takeListComponents = "";

    console.log(products);

    if (!products.length || products[0] == undefined) {
      takeListComponents = (
        <>
          <div className="listtable">
            <h2>Nenhum produto encontrado!</h2>
          </div>
        </>
      );
      this.props.getAllProducts();
    } else {
      takeListComponents = (
        <div className="listtable">
          <table className="productTable">
            <tbody >
              <tr className="trTable">
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th></th>
              </tr>
              {products.map((prod) => (
                <tr className="trTable" key={prod.id}>
                  <td className="tdTable">{prod.nome}</td>
                  <td className="tdTable">
                    {prod.descricao ? prod.descricao : "Sem descrição"}
                  </td>
                  <td className="tdTable">
                    {parseFloat(prod.preco).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td> 

                  <td className="tdTable">
                    <div className="icons">
                      <a
                        className="actions"
                        onClick={() => this.handleEdit(prod)}
                      >
                        <MdEdit />
                      </a>
                      <a
                        className="actions"
                        onClick={() => this.handleDelete(prod.id)}
                      >
                        <MdDelete />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <>
        <div className="formProduto">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Nome: </label>
              <Input
                state={this.state.nome}
                onChange={this.handleChange}
                type="text"
                id="nome"                
              />
            </div>

            <div className="field">
              <label>Preço: (R$) </label>
              <Input
                state={this.state.preco}
                onChange={this.handleChange}
                type="number"
                step=".01"
                id="preco"
                className='inputProduto'
              />
            </div>

            <div className='areaField'>
              <label className="labelProduto">Descrição: </label>
              <textarea
                value={this.state.descricao}
                onChange={this.handleChange}
                id="descricao"
              ></textarea>
            </div>

            <div>
              <Button />
            </div>
          </form>
        </div>
        {takeListComponents}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduto);
