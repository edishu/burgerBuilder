import React, { useState , Fragment } from "react";
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }


    return (
        <Fragment>
            <Toolbar 
            isAuth={props.isAuthenticated}
            openSide = {sideDrawerOpenHandler}/>
            <SideDrawer isAuth={props.isAuthenticated}
            open={showSideDrawer} 
            closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
    
}

const mapStateToProps = state => {
    
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(layout);