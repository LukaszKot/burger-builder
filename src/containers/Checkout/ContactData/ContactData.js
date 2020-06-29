import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ""
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ""
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ""
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ""
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ""
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        displayValue: 'Fastest'
                    },
                    {
                        value: 'cheapest',
                        displayValue: 'Cheapest'
                    }]
                },
                value: ""
            },
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

    inputChangedHandler = (event) => {
        console.log(event.target.value)
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (<div className={classes.ContactData}>
            <h4>Entry you Contact Data</h4>
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        inputType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={this.inputChangedHandler} />
                ))}
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
