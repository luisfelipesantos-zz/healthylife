import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  addContraIndication,
  getAllContraIndications,
  editContraIndication,
  deleteContraIndication,
} from "../../actions/contraIndActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { setTable } from "../../actions/generalActions";

const mapStateToProps = (state) => {
  return { contraindications: state.contraindications };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addContraIndication: (contraindication) =>
      dispatch(addContraIndication(contraindication)),
    setTable: (table) => dispatch(setTable(table)),
    getAllContraIndications: () => dispatch(getAllContraIndications()),
    editContraIndication: (contra) => dispatch(editContraIndication(contra)),
    deleteContraIndication: (id) => dispatch(deleteContraIndication(id)),
  };
};

class FromContraInd extends Component {
  componentDidMount() {
    this.props.getAllContraIndications();
  }

  constructor() {
    super();

    this.state = {
      nomeContra: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(indication) {
    this.setState({
      id: indication.id,
      nomeContra: indication.nome,
    });
  }

  async handleDelete(id) {
    await this.props.deleteContraIndication(id);
    this.props.getAllContraIndications();

    this.setState({
      id: null,
      nomeContra: "",
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
    this.props.setTable("3");
    var nome = this.state.nomeContra;
    const { id } = this.state;
    if (id !== null && id !== undefined) {
      await this.props.editContraIndication({ id, nome });
      await this.props.getAllContraIndications();
    } else {
      this.props.addContraIndication({
        id: id,
        nome: nome
      });
    }

    this.setState({
      id: null,
      nomeContra: "",
    });
  }

  render() {
    const { contraindications } = this.props;
    let takeListComponents = "";

    if (!contraindications.length) {
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
            </tr>
            {contraindications.map((contraindication) => (
              <tr className="trTable">
                <td className="tdTable">{contraindication.nome}</td>
                <td className="tdTable">
                  <div class="icons">
                    <a
                      className="actions"
                      onClick={() => this.handleEdit(contraindication)}
                    >
                      <MdEdit />
                    </a>
                    <a
                      className="actions"
                      onClick={() => this.handleDelete(contraindication.id)}
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
        <div className="formContra">
          <form onSubmit={this.handleSubmit}>
            <div class="fieldName">
              <label>Nome: </label>
              <Input
                state={this.state.nomeContra}
                onChange={this.handleChange}
                type="text"
                id="nomeContra"
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

export default connect(mapStateToProps, mapDispatchToProps)(FromContraInd);
