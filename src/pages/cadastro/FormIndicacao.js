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
      nomeInd: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(indication) {
    this.setState({
      id: indication.id,
      nomeInd: indication.nome,
    });
  }

  async handleDelete(id) {
    await this.props.deleteIndication(id);
    this.props.getAllIndications();

    this.setState({
      id: null,
      nomeInd: "",
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
    this.props.setTable("2");

    var nome = this.state.nomeInd;

    const { id } = this.state;
    if (id !== null && id !== undefined) {
      await this.props.editIndication({ id, nome });
      await this.props.getAllIndications();
    } else {
      this.props.addIndication({
        id: id,
        nome: nome
      });
    }

    this.setState({
      id: null,
      nomeInd: "",
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
          <table className="productTable">
            <tbody>
              <tr className="trTable">
                <th>Nome</th>
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
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <>
        <div className="formIndicacao">
          <form onSubmit={this.handleSubmit}>
            <div class="fieldName">
              <label>Nome: </label>
              <Input
                state={this.state.nomeInd}
                onChange={this.handleChange}
                type="text"
                id="nomeInd"
                className='inputProduto'
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

export default connect(mapStateToProps, mapDispatchToProps)(FormIndicacao);
