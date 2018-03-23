import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import './SideDrawer.css';

const sideDrawer = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.closeSideDrawer}/>
        <div className={'side-drawer ' + (props.show? 'open' : 'close')}>
            <div className="logo-drawer"> <Logo /> </div>
            <NavigationItems />
        </div>
    </React.Fragment>
);

export default sideDrawer;