import React from 'react';

import classes from './DrawerToggel.css';

const drawertoggel = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawertoggel;