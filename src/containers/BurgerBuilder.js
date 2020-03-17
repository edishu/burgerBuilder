import React, {Component, Fragment} from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import WithErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';



class BurgerBuilder extends Component {
    state = {
        purchasing: false, 
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
    }

    updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => ingredients[igkey])
        .reduce((sum, el) => sum + el,0);
        return sum>0;
    }

    purchaceHandler = () => {
        this.setState({purchasing: true});
    }

    purchaceCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaceCompleteHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        //this.updatePurchaseable();
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.err ? <p>Ingredients cannot be loaded.</p> : <Spinner/>;
        if (this.props.ings) 
        {
            burger = 
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    purchaseable={this.updatePurchaseable(this.props.ings)}
                    order = {this.purchaceHandler}
                    price={this.props.price}/>  
                </Fragment>

            orderSummary = <OrderSummary ingredients={this.props.ings}
                            canclled={this.purchaceCancelHandler}
                            ordered={this.purchaceCompleteHandler}
                            price={this.props.price}/>
                        }

        // console.log(this.props.price);
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClose={this.purchaceCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                
            </Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));