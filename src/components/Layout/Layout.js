import React, { Component , Fragment } from "react";
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/NavigationItems/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Fragment>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                openSide = {this.sideDrawerOpenHandler}/>

                <SideDrawer isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);