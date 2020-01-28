import React from 'react';
import './Button.css';

const Button = props => {

    let classes = '';
    classes += props.operation ? 'operation' : '';
    classes += props.double ? 'double' : '';
    classes += props.triple ? 'triple' : '';

    return (
        <button
            onClick={e => props.click && props.click(props.label)} 
            className={classes}>
            {props.label}
        </button>
    )
}

export default Button;