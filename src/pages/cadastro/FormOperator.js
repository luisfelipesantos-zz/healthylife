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
      nome: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(operator) {
    this.setState({
      id: operator.id,
      nome: operator.nome,
    });
  }

  async handleDelete(id) {
    await this.props.deleteOperator(id);
    this.props.getAllOperators();

    this.setState({
      id: null,
      nome: "",
    });
  }

  handleChange(event) {
    console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async handleSubmit(event) {
    this.props.setTable("5");

    const { id, nome } = this.state;
    if (id !== null && id !== undefined) {
      await this.props.editOperator({ id, nome });
      await this.props.getAllOperators();
    } else {
      this.props.addOperator(this.state);
    }

    this.setState({
      id: null,
      nome: "",
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
          <table>
            <tr>
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
            {operators.map((operator) => (
              <tr>
                <td>{operator.nome}</td>
                <td>
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
        <form onSubmit={this.handleSubmit}>
          <div class="inputs">
            <label>Nome: </label>
            <Input
              state={this.state.nome}
              onChange={this.handleChange}
              type="text"
              id="nome"
            />
          </div>

          <div class="buttonDiv">
            <Button />
          </div>

          {takeListComponents}
        </form>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormOperator);
