import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const igredientsSummary = Object.keys(props.ingredients)
        .map(key =>
            <li key={key}>
                <span style={{ textTransform: "capitalize" }}>{key}</span>: {props.ingredients[key]}
            </li>)
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {igredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
}

export default OrderSummary;