import React from 'react';

const Input = ({ state, onChange, type, step, id }) => {
    return(
            <input 
                type={type}
                step={step}
                id={id}
                onChange={onChange} 
                value={state} 
            />   
    );
}

export default Input;