import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Dropdown from './Dropdown';
import { addProduct } from '../../actions/productActions';


const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => dispatch(addProduct(product))
    }
}

class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
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
        console.log('TA CHEGANDO AQUI');
        this.props.addProduct(this.state);

        this.setState({
            name: '',
            preco: 0,
            descricao: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Dropdown />

                <label>Nome: </label>
                <Input state={this.state.name} onChange={this.handleChange} type='text' id='name'/>
                
                <label>Descrição: </label>
                <Input state={this.state.descricao} onChange={this.handleChange} type='text' id='descricao'/>
                
                <label>Preço: </label>
                <Input state={this.state.preco} onChange={this.handleChange} type='number' id='preco'/>
                
                <Button />
            </form>
        );
    }
}

export default connect(null, mapDispatchToProps)(Form);