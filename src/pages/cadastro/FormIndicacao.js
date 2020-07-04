import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  addIndication,
  getAllIndications,
  editIndication,
  deleteIndication,
} from "../../actions/indicationActions";
import { setTable } from "../../actions/generalActions";
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = (state) => {
  return { indications: state.indications };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIndication: (indication) => dispatch(addIndication(indication)),
    getAllIndications: () => dispatch(getAllIndications()),
    setTable: (table) => dispatch(setTable(table)),
    editIndication: (indication) => dispatch(editIndication(indication)),
    deleteIndication: (id) => dispatch(deleteIndication(id)),
  };
};

class FormIndicacao extends Component {
  componentDidMount() {
    this.props.getAllIndications();
  }

  constructor() {
    super();

    this.state = {
      nome: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(indication) {
    this.setState({
      id: indication.id,
      nome: indication.nome,
    });

    
  }

  async handleDelete(id) {
    await this.props.deleteIndication(id);
    this.props.getAllIndications();

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
    this.props.setTable("2");

    const { id, nome } = this.state;
    if (id !== null && id !== undefined) {
      await this.props.editIndication({ id, nome });
      await this.props.getAllIndications();
    } else {
      this.props.addIndication(this.state);
    }

    this.setState({
      id: null,
      nome: "",
    });
  }

  render() {
    const { indications } = this.props;
    let takeListComponents = "";

    if (!indications.length) {
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
          <table className='productTable'>
            <tr className="trTable">
              <th>Nome</th>
              <th></th>
              <th></th>
            </tr>
            {indications.map((indication) => (
              <tr className="trTable">
                <td className="tdTable">{indication.nome}</td>
                <td className="tdTable">
                  <div class="icons">
                    <a
                      className="actions"
                      onClick={() => this.handleEdit(indication)}
                    >
                      <MdEdit />
                    </a>
                    <a
                      className="actions"
                      onClick={() => this.handleDelete(indication.id)}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormIndicacao);
