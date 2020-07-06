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
      id: null,
      nomeCateg: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleEdit(category) {
    console.log(category)
    await this.setState({
      id: category.id,
      nomeCateg: category.nome,
    });

    await console.log(this.state)
  }

  async handleDelete(id) {
    await this.props.deleteCategory(id);
    this.props.getAllCategories();

    this.setState({
      id: null,
      nomeCateg: "",
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
    this.props.setTable("4");

    console.log(this.state)

    var nome = this.state.nomeCateg;
    const { id } = this.state;

    if (id !== null && id !== undefined) {
      await this.props.editCategory({ id, nome });
      await this.props.getAllCategories();
    } else {
      this.props.addCategory({
        id: id,
        nome: nome
      });
    }

    this.setState({
      nomeCateg: "",
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
          <table className="productTable">
            <tr className="trTable">
              <th>Nome</th>
            </tr>
            {categories.map((category) => (
              <tr className="trTable">
                <td className="tdTable">{category.nome}</td>
                <td className="tdTable">
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
      <div className='formCategoria'>
        <form onSubmit={this.handleSubmit}>
          <div class="fieldName">
            <label>Nome:</label>
            <Input
              state={this.state.nomeCateg}
              onChange={this.handleChange}
              type="text"
              id="nomeCateg"
            />
          </div>


          <div >
            <Button />
          </div>
        </form>
        </div>
        {takeListComponents}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormCategory);
