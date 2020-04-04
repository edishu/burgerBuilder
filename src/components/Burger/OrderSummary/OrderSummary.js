import React, { Component, Fragment} from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{' '+ props.ingredients[igKey]}
    </li>
    ));

    return (
    <Fragment>
        <h3>Your Order</h3>
        <p>A delisious burger with following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
        <p>Continue to Order?</p>
        <Button btnType="Danger" clicked={props.canclled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.ordered}>CONTINUE</Button>
    </Fragment>
    );
}

export default orderSummary;