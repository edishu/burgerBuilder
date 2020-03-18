import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
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
                    placeholder: 'Street'
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
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {},
                touched: false
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        for (let formID in this.state.orderForm) {
            formData[formID] = this.state.orderForm[formID].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, elementID) => {

        const updatedElement = updateObject(this.state.orderForm[elementID], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[elementID].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [elementID]: updatedElement
        });

        let formValid = true;
        for (let element in updatedOrderForm) {
            if (updatedOrderForm[element].validation) {
                formValid = updatedOrderForm[element].valid && formValid;
            }
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formValid});
    }

    render () {
        const formElements = [];
        for(let key of Object.keys(this.state.orderForm)) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (<form onSubmit={this.orderHandler}>
                       {formElements.map(element => (
                       <Input
                       key={element.id}
                       elementType={element.config.elementType}
                       elementConfig={element.config.elementConfig}
                       value={element.config.value}
                       label={element.id}
                       changed={(ev) => this.inputChangeHandler(ev, element.id)}
                       invalid={!element.config.valid}
                       shouldValidate={element.config.validation}
                       touched={element.config.touched}>
                       </Input>)
                       )}
                       <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
                    </form>);
        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));