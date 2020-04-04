import React, {useState, useEffect, Fragment, useCallback} from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders';
import WithErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../components/UI/Spinner/Spinner';
import { useDispatch, useSelector} from 'react-redux';
import * as actions from '../store/actions/index';



const burgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const err = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);
    
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseable = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => ingredients[igkey])
        .reduce((sum, el) => sum + el,0);
        return sum>0;
    }

    const purchaceHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
        
    }

    const purchaceCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaceCompleteHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disableInfo = {
        ...ings
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = err ? <p>Ingredients cannot be loaded.</p> : <Spinner/>;
    if (ings) 
    {
        burger = 
            <Fragment>
                <Burger ingredients={ings}/>
                <BuildControls 
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                disabled={disableInfo}
                purchaseable={updatePurchaseable(ings)}
                order = {purchaceHandler}
                isAuth = {isAuthenticated}
                price={price}/>  
            </Fragment>

        orderSummary = <OrderSummary ingredients={ings}
                        canclled={purchaceCancelHandler}
                        ordered={purchaceCompleteHandler}
                        price={price}/>
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClose={purchaceCancelHandler}>
            {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );

}


export default WithErrorHandler(burgerBuilder, axios);