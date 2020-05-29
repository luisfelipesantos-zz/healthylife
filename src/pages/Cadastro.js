import React, { Component } from 'react';

import '../style/cadastro.css';

import FormProduto from './cadastro/FormProduto';
import FormIndicacao from './cadastro/FormIndicacao';
import Dropdown from './Dropdown';
import { connect } from 'react-redux';
import FormContraInd from './cadastro/FormContraInd';
import FormCategory from './cadastro/FormCategory';
import FormOperator from './cadastro/FormOperator';
import logo from '../images/logo.png';

function mapStateToProps(state) {
    return { table: state.tables.table };
};

class Cadastro extends Component {
    render() {

        function renderForm(table) {
            switch (table) {
                case '1':
                    return (
                        <FormProduto />
                    );

                case '2':
                    return (
                        <FormIndicacao />
                    )

                case '3':
                    return (
                        <FormContraInd />
                    )

                case '4':
                    return (
                        <FormCategory />
                    )

                case '5':
                    return (
                        <FormOperator />
                    )

                default:
                    return (
                        <FormProduto />
                    );
            }
        }

        return (
            <>
                <div id="sidebar">
                    <img className='registerLogo' src={logo} alt='logo' />
                    <h3 className='registerTitle'>Módulo de Cadastros</h3>
                    <Dropdown />
                </div>

                <div id='main'>
                    {renderForm(this.props.table)}
                </div>
            </>
        );
    };
};

export default connect(mapStateToProps)(Cadastro);
