import React, { Component } from 'react';
import { getAllProducts } from '../actions/productActions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { products: state.products }
}

const mapDispatchToProps = (dispatch) => {
    return { getAllProducts: () => dispatch(getAllProducts()) }
}

class Table extends Component {

    componentDidMount() {
        this.props.getAllProducts();
    }

    render() {
        const { products } = this.props;
        let takeListComponents = '';

        if (!products.length) {
            takeListComponents =
                <>
                    <div><h2>Nenhum produto encontrado!</h2></div>
                </>;
        } else {
            takeListComponents =
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                    </tr>
                    {products.map(prod => (
                        <tr>
                            <td>{prod.nome}</td>
                            <td>{parseFloat(prod.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{prod.descricao ? prod.descricao : 'Sem descrição'}</td>
                            <td><a href='#'>Atualizar</a></td>
                            <td><a href='#'>Excluir</a></td>
                        </tr>
                    ))}
                </table>;
        }

        return (
            <>
                { takeListComponents }
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
