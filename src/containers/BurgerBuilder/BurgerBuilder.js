import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data }, () => {
        //             this.updatePurchaseState(this.state.ingredients);
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) { disabledInfo[key] = disabledInfo[key] <= 0 }

        let orderSummary = null;
        if (this.props.ings) {
            orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = <Fragment><Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                /></Fragment>
        }




        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Fragment>
        );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    updatePurchaseState(updatedIngredients) {
        const ingredients = { ...updatedIngredients }
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, curr) => acc + curr, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));