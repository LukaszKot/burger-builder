import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {



    constructor(props) {
        super(props)
        const query = new URLSearchParams(props.location.search)
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] !== 'price') {
                ingredients[param[0]] = +param[1];
            }
            else {
                price = +param[1];
            }

        }

        this.state = {
            ingredients: ingredients,
            price: price
        }

    }



    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + "/contact-data"}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)}
                />
            </div>
        )
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
}

export default Checkout;