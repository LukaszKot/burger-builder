import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Łukasz Kot",
                address: {
                    street: "Test 123",
                    zipCode: "412345",
                    country: "Poland"
                },
                email: "test@test.com"
            }
        }

        this.setState({
            loading: true
        })
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        let form = (<div className={classes.ContactData}>
            <h4>Entry you Contact Data</h4>
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="street" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        </div>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return form;
    }
}

export default ContactData;
