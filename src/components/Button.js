import React from 'react';

const Button = ({ onClick }) => {
    return (
        <button className='registerButton' onClick={onClick}>Salvar</button>
    );
}

export default Button;