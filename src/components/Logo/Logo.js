import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';

import './Logo.css';

const logo = props => (
    <div className="Logo">
        <img src={burgerLogo} alt="" />
    </div>
)

export default logo;