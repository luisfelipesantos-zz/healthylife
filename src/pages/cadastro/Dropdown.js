import React from 'react';

const Dropdown = () => {
    return (
        <div>
            <label for='tables'>Tabela: </label>
            <select id='tables'>
                <option value='1'>Indicação</option>
                <option value='2'>Contra-indicação</option>
                <option value='3'>Categoria</option>
                <option value='4'>Produto</option>
                <option value='5'>Operador</option>
            </select>
        </div>
    );
}

export default Dropdown;