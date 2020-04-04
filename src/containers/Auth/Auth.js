import React, { useState, useEffect } from 'react';
import Input from  '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

const auth = props => {
    const [controls, setControls] = useState ({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        });

    const [isSignUp, setIsSignUp] =  useState(true);

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;
    
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangeHandler = (event, controlName) => {

        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthModehandler = () => {
        setIsSignUp(!isSignUp);
    }

    const formElements = [];
    for(let key of Object.keys(controls)) {
        formElements.push({
            id: key,
            config: controls[key]
        })
    }
    
    let form = formElements.map(element => (
                <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    label={element.id}
                    changed={(ev) => inputChangeHandler(ev, element.id)}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}>
                    </Input>)
        );
    
    if (props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{props.error.message}</p>
        );
    }

    let redirect = null;
    if (props.isAuthenticated) {
        redirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={classes.Auth}>
            {redirect}
            {errorMessage}
            <form onSubmit={onSubmitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button 
                clicked={switchAuthModehandler}
                btnType="Danger">
                Switch to {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);