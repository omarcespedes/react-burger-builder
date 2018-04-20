import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as orderActions from '../../../store/actions';

class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity = (elementId, value) => {
        let isValid = true;
        const validationRule = this.state.orderForm[elementId].validation;
        if (validationRule.required) {
            isValid = value.trim() !== '';
        }
        if (validationRule.minLength) {
            isValid = validationRule.minLength <= value.length && isValid;
        }
        if (validationRule.maxLength) {
            isValid = validationRule.maxLength >= value.length && isValid;
        }
        return isValid;
    }

    onInputChanged = (event, elementId) => {
        let isValid = true;
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[elementId]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(elementId, updatedFormElement.value);
        updatedFormElement.touched = true;
        updatedOrderForm[elementId] = updatedFormElement;

        for (let element in updatedOrderForm) {
            isValid = isValid && updatedOrderForm[element].valid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: isValid
        });
    }

    orderSubmitted = (ev) => {
        ev.preventDefault();
        const orderData = {};
        for (let field in this.state.orderForm) {
            orderData[field] = this.state.orderForm[field].value;
        }

        const payload = {
            ingredients: this.props.ingredients,
            order: orderData
        }

        this.props.onSubmitOrder(payload);
    }

    render() {
        const orderFormElements = [];

        for ( let el in this.state.orderForm) {
            orderFormElements.push({
                id: el,
                config: this.state.orderForm[el]
            });
        }

        return (
            <div style={{border: '1px solid #ccc', padding: '10px 15px'}}>
                <h4>Enter your contact details </h4>
                <form onSubmit={this.orderSubmitted}>
                    {orderFormElements.map(element => (
                        <Input 
                            key={element.id}
                            elementType={element.config.elementType} 
                            elementConfig={element.config.elementConfig}
                            changed={(event) => this.onInputChanged(event, element.id)}
                            valid={element.config.valid}
                            touched={element.config.touched}
                            />
                    ))}
                    <button disabled={!this.state.formIsValid}> Order </button>               
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.selectedIngredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitOrder: (orderData) => dispatch(orderActions.purchaseOrder(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);