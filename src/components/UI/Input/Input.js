import React from 'react';
import './Input.css';

const input = (props) => {
    let inputEl = null;
    const classes = ['input'];

    if(!props.valid && props.touched) {
        classes.push('invalid');
    }

    switch (props.elementType) {
        case 'input':
            inputEl = <input className={classes.join(' ')} {...props.elementConfig} value={props.elementConfig.value} onChange={props.changed}/>
            break;
        case 'textarea':
            inputEl = <input className={classes.join(' ')} {...props.elementConfig} value={props.elementConfig.value} onChange={props.changed}/>
            break;
        case 'select':
            inputEl = (
                <select className={classes.join(' ')} value={props.elementConfig.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl = <input className={classes.join(' ')} {...props.elementConfig} value={props.elementConfig.value} onChange={props.changed}/>
            break;
    }

    return (
        <div className="input-element">
            <label className="input-label">{props.label}</label>
            {inputEl}
        </div>
    );
}

export default input;