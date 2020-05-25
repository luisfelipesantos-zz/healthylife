import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addIndication, getAllIndications } from '../../actions/indicationActions';
import { setTable } from '../../actions/generalActions';
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = state => {
    return { indications: state.indications }
}

const mapDispatchToProps = dispatch => {
    return {
        addIndication: indication => dispatch(addIndication(indication)),
        getAllIndications: () => dispatch(getAllIndications()),
        setTable: table => dispatch(setTable(table))
    }
}

class FormIndicacao extends Component {

    componentDidMount() {
        this.props.getAllIndications();
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
        this.props.setTable('2');
        this.props.addIndication(this.state);

        this.setState({
            nome: ''
        });
    }

    render() {
        const { indications } = this.props;
        let takeListComponents = '';

        if (!indications.length) {
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
                        {indications.map(indication => (
                            <tr>
                                <td>{indication.nome}</td>
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
                </form>

                {takeListComponents}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormIndicacao);