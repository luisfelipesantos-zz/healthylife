import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addProduct, getAllProducts } from '../../actions/productActions';
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = state => {
    return { products: state.products }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProduct(product)),
        getAllProducts: () => dispatch(getAllProducts())
    }
}

class FormProduto extends Component {

    componentDidMount() {
        this.props.getAllProducts();
    }

    constructor() {
        super();

        this.state = {
            nome: '',
            preco: 0,
            descricao: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.id);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.addProduct(this.state);

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
                    <div class='listtable'><h2>Nenhum produto encontrado!</h2></div>
                </>;
        } else {
            takeListComponents =
                <div class='listtable'>
                    <table>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th></th>
                        </tr>
                        {products.map(prod => (
                            <tr>
                                <td>{prod.nome}</td>
                                <td>{prod.descricao ? prod.descricao : 'Sem descrição'}</td>
                                <td>{parseFloat(prod.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>

                                <td>
                                    <div class='icons'>
                                        <a href='#'><MdEdit /></a>
                                        <a href='#'><MdDelete /></a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>;
        }

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div class='inputs'>
                        <label>Nome: </label>
                        <Input state={this.state.nome} onChange={this.handleChange} type='text' id='nome' />
                    </div>

                    <div class='inputs'>
                        <label>Preço: (R$) </label>
                        <Input state={this.state.preco} onChange={this.handleChange} type='number' id='preco' />
                    </div>

                    <div class='desc'>
                        <label>Descrição: </label>
                        <textarea value={this.state.descricao} onChange={this.handleChange} id='descricao'></textarea>
                    </div>

                    <div class='buttonDiv'>
                        <Button />
                    </div>
                </form>

                {takeListComponents}

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProduto);