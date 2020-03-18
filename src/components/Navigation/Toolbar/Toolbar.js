import React from 'react';
import Logo from '../../Logo/Logo'
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggel from '../NavigationItems/SideDrawer/DrawerToggel/DrawerToggel';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggel clicked={props.openSide}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;