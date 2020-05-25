import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addOperator, getAllOperators } from '../../actions/operatorActions';
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = state => {
    return { operators: state.operators }
}

const mapDispatchToProps = dispatch => {
    return {
        addOperator: operator => dispatch(addOperator(operator)),
        getAllOperators: () => dispatch(getAllOperators())
    }
}

class FormOperator extends Component {
    componentDidMount() {
        this.props.getAllOperators();
    }

    constructor() {
        super();

        this.state = {
            nome: ''
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
        this.props.addOperator(this.state);

        this.setState({
            nome: ''
        });
    }

    render() {
        const { operators } = this.props;
        let takeListComponents = '';

        if (!operators.length) {
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
                            <th></th>
                            <th></th>
                        </tr>
                        {operators.map(operator => (
                            <tr>
                                <td>{operator.nome}</td>
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

                    <div class='buttonDiv'>
                        <Button />
                    </div>

                    {takeListComponents}
                </form>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormOperator);