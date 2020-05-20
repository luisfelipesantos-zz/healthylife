import React, { Component } from 'react';

import '../style/cadastro.css';

import Table from '../components/Table';
import Form from '../pages/cadastro/Form';

class Cadastro extends Component {
    render() {
        return (
            <>
                <div>
                    <h1>Componente Cadastro</h1>
                    <Form />
                </div>

                <div>
                    <Table />
                </div>
            </>
        );
    };
};

export default Cadastro;
