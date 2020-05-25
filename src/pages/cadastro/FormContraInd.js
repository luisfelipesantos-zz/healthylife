import React, { Component } from 'react';

import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { addContraIndication, getAllContraIndications } from '../../actions/contraIndActions';
import { MdDelete, MdEdit } from "react-icons/md";

const mapStateToProps = state => {
    return { contraindications: state.contraindications }
}

const mapDispatchToProps = dispatch => {
    return {
        addContraIndication: contraindication => dispatch(addContraIndication(contraindication)),
        getAllContraIndications: () => dispatch(getAllContraIndications())
    }
}

class FromContraInd extends Component {

    componentDidMount() {
        this.props.getAllContraIndications();
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
        this.props.addContraIndication(this.state);

        this.setState({
            nome: ''
        });
    }

    render() {
        const { contraindications } = this.props;
        let takeListComponents = '';

        if (!contraindications.length) {
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
                        </tr>
                        {contraindications.map(contraindication => (
                            <tr>
                                <td>{contraindication.nome}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(FromContraInd);