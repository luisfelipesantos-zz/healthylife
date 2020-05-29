import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addProduct, getAllProducts, editProduct, deleteProduct } from '../../actions/productActions';
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = state => {
    return { products: state.products }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProduct(product)),
        getAllProducts: () => dispatch(getAllProducts()),
        editProduct: product => dispatch(editProduct(product)),
        deleteProduct: id => dispatch(deleteProduct(id))
    }
}

class FormProduto extends Component {

    componentDidMount() {
        this.props.getAllProducts();
    }

    constructor() {
        super();

        this.state = {
            id: null,
            nome: '',
            preco: 0,
            descricao: ''
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
            descricao: product.descricao
        });
    }

    handleDelete(id) {
        this.props.deleteProduct(id);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        const { id, nome, preco, descricao } = this.state;
        if (id !== null) {
            this.props.editProduct({ id, nome, preco, descricao });
        } else {
            this.props.addProduct(this.state);
        }

        this.setState({
            nome: '',
            preco: 0,
            descricao: ''
        });

    }

    render() {

        const { products } = this.props;
        let takeListComponents = '';

        if (!products.length) {
            takeListComponents =
                <>
                    <div className='listtable'><h2>Nenhum produto encontrado!</h2></div>
                </>;
        } else {
            takeListComponents =
                <div className='listtable'>
                    <table className='productTable'>
                        <tbody>
                            <tr className='trTable'>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                            {products.map(prod => (
                                <tr className='trTable' key={prod.id}>
                                    <td className='tdTable'>{prod.nome}</td>
                                    <td className='tdTable'>{prod.descricao ? prod.descricao : 'Sem descrição'}</td>
                                    <td className='tdTable'>{parseFloat(prod.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>

                                    <td className='tdTable'>
                                        <div className='icons'>
                                            <a className='actions' onClick={() => this.handleEdit(prod)} href='#top'><MdEdit /></a>
                                            <a className='actions' onClick={() => this.handleDelete(prod.id)}><MdDelete /></a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>;
        }

        return (
            <>
                <form className='registerForm' onSubmit={this.handleSubmit}>
                    <div className='inputs'>
                        <label>Nome: </label>
                        <Input  state={this.state.nome} onChange={this.handleChange} type='text' id='nome' />
                    </div>

                    <div className='inputs'>
                        <label>Preço: (R$) </label>
                        <Input  state={this.state.preco} onChange={this.handleChange} type='number' id='preco' />
                    </div>

                    <div className='desc'>
                        <label>Descrição: </label>
                        <textarea value={this.state.descricao} onChange={this.handleChange} id='descricao'></textarea>
                    </div>

                    <div className='buttonDiv'>
                        <Button />
                    </div>
                </form>

                {takeListComponents}

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduto);