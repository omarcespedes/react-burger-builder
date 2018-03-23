import React from 'react';
import './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleSideDrawer from '../SideDrawer/ToggleSideDrawer/ToggleSideDrawer';

const toolbar = (props) => (
    <header className="Toolbar">
        <ToggleSideDrawer click={props.clickToggle}/>
        <Logo />
        <div className="desktop-only"> <NavigationItems /> </div>
    </header>
)

export default toolbar;