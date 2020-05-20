import React from 'react';

const Input = ({ state, onChange, type, id }) => {
    return(
        <div>
            <input 
                type={type}
                id={id}
                onChange={onChange} 
                value={state} 
            />            
        </div>
    );
}

export default Input;