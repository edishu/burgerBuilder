import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter , Route , Switch, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';


const app = props => {

  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);


  let route = (
    <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/" component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );

  if (props.isAuthenticated) {
    route = (
      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/" component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
  };

  return (
    <div>
      <BrowserRouter>
        <Layout>
          {route}
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !==null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
