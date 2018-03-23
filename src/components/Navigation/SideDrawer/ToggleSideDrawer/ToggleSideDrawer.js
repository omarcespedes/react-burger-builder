import React from 'react';
import './ToggleSideDrawer.css';

const toggleSideDrawer = (props) => (
    <div onClick={props.click} className="toggle-drawer">
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default toggleSideDrawer;