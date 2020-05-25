import React from 'react';

const Input = ({ state, onChange, type, id }) => {
    return(
            <input 
                type={type}
                id={id}
                onChange={onChange} 
                value={state} 
            />   
    );
}

export default Input;