import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  addOperator,
  getAllOperators,
  editOperator,
  deleteOperator,
} from "../../actions/operatorActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { setTable } from "../../actions/generalActions";

const mapStateToProps = (state) => {
  return { operators: state.operators };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addOperator: (operator) => dispatch(addOperator(operator)),
    getAllOperators: () => dispatch(getAllOperators()),
    editOperator: (operator) => dispatch(editOperator(operator)),
    deleteOperator: (id) => dispatch(deleteOperator(id)),
    setTable: (table) => dispatch(setTable(table)),
  };
};

class FormOperator extends Component {
  componentDidMount() {
    this.props.getAllOperators();
  }

  constructor() {
    super();

    this.state = {
      id: null,
      nomeOperador: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(operator) {
    this.setState({
      id: operator.id,
      nomeOperador: operator.nome,
    });
  }

  async handleDelete(id) {
    await this.props.deleteOperator(id);
    this.props.getAllOperators();

    this.setState({
      id: null,
      nomeOperador: "",
    });
  }

  handleChange(event) {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.setTable("5");

    var nome = this.state.nomeOperador;

    const { id } = this.state;
    if (id !== null && id !== undefined) {
      await this.props.editOperator({ id, nome });
      await this.props.getAllOperators();
    } else {
      this.props.addOperator({
        id: id,
        nome: nome,
      });
    }

    this.setState({
      id: null,
      nomeOperador: "",
    });
  }

  render() {
    const { operators } = this.props;
    let takeListComponents = "";

    if (!operators.length) {
      takeListComponents = (
        <>
          <div class="listtable">
            <h2>Nenhum produto encontrado!</h2>
          </div>
        </>
      );
    } else {
      takeListComponents = (
        <div class="listtable">
          <table className="productTable">
            <tr className="trTable">
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
            {operators.map((operator) => (
              <tr className="trTable">
                <td className="tdTable">{operator.nome}</td>
                <td className="tdTable">
                  <div class="icons">
                    <a
                      className="actions"
                      onClick={() => this.handleEdit(operator)}
                    >
                      <MdEdit />
                    </a>
                    <a
                      className="actions"
                      onClick={() => this.handleDelete(operator.id)}
                    >
                      <MdDelete />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    }

    return (
      <>
        <div className="formOperador">
          <form onSubmit={this.handleSubmit}>
            <div class="fieldName">
              <label>Nome: </label>
              <Input
                state={this.state.nomeOperador}
                onChange={this.handleChange}
                type="text"
                id="nomeOperador"
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(FormOperator);
