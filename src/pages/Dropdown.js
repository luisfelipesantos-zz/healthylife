import React, { Component } from 'react';
import { setTable } from '../actions/generalActions';
import { connect } from 'react-redux';


const mapDispatchToProps = dispatch => {
    return {
        setTable: table => dispatch(setTable(table))
    }
}

class Dropdown extends Component {

    constructor() {
        super();

        this.changeTable = this.changeTable.bind(this);
    }

    changeTable(event) {
        this.props.setTable(event.target.value);
    }

    render() {
        return (
            <div>
                <select id='tables' onChange={this.changeTable}>
                    <option value='1'>Produto</option>
                    <option value='2'>Indicação</option>
                    <option value='3'>Contra-indicação</option>
                    <option value='4'>Categoria</option>
                    <option value='5'>Operador</option>
                </select>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Dropdown);