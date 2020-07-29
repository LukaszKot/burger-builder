import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    render() {
        let summary = <Redirect to='/' />
        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
        if (this.props.ings) {
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
            </div>)
        }
        return summary
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}




export default connect(mapStateToProps)(Checkout);