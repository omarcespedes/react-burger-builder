import React from 'react';
import './NavigationItems.css';
import { Link } from 'react-router-dom';

const navigationItems = () => (
    <nav className="nav-items">
        <ul>
            <Link to="/burger-builder"><li> Burger Builder </li> </Link>
            <Link to="/orders"><li> Orders </li> </Link>
        </ul>
    </nav>
);

export default navigationItems;