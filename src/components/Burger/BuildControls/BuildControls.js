import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => {
    
    return (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(el => <BuildControl 
                                    key={el.label}
                                    label={el.label}
                                    type={el.type}
                                    added={() => props.ingredientAdded(el.type)}
                                    removed={() => props.ingredientRemoved(el.type)}
                                    disable={props.disabled[el.type]}/>)}
        <button 
            className={classes.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.order}>ORDER NOW</button>
    </div>
    );
};

export default buildControls;