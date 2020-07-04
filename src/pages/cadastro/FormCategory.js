import React, { Component } from "react";

import { connect } from "react-redux";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  addCategory,
  getAllCategories,
  editCategory,
  deleteCategory,
} from "../../actions/categoryActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { setTable } from "../../actions/generalActions";

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: (category) => dispatch(addCategory(category)),
    getAllCategories: () => dispatch(getAllCategories()),
    editCategory: (category) => dispatch(editCategory(category)),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    setTable: (table) => dispatch(setTable(table))
  };
};

class FormCategory extends Component {
  componentDidMount() {
    this.props.getAllCategories();
  }

  constructor() {
    super();

    this.state = {
      nome: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(category) {
    this.setState({
      id: category.id,
      nome: category.nome,
    });
  }

  async handleDelete(id) {
    await this.props.deleteCategory(id);
    this.props.getAllCategories();

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
    this.props.setTable("4");

    const { id, nome } = this.state;
    if (id !== null) {
      await this.props.editCategory({ id, nome });
      await this.props.getAllCategories();
    } else {
      this.props.addCategory(this.state);
    }

    this.setState({
      nome: "",
    });
  }

  render() {
    const { categories } = this.props;
    let takeListComponents = "";

    if (!categories.length) {
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
            </tr>
            {categories.map((category) => (
              <tr>
                <td>{category.nome}</td>
                <td>
                  <div class="icons">
                    <a
                      className="actions"
                      onClick={() => this.handleEdit(category)}
                    >
                      <MdEdit />
                    </a>
                    <a
                      className="actions"
                      onClick={() => this.handleDelete(category.id)}
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
            <label>Nome:</label>
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
        </form>
        {takeListComponents}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCategory);
