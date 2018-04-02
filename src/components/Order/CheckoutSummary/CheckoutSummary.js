import React from 'react';
import Burger from '../../Burger/Burger';
import { Route, withRouter } from 'react-router-dom';
import './CheckoutSummary.css';
import ContactData from '../../../containers/Checkout/ContactData/ContactData';

const checkoutSummary = (props) => (
    <div className="checkout-summary">
        <Burger ingredients={props.ingredients} />
        <div>
            <button onClick={props.cancelClicked}> Cancel </button>
            <button onClick={props.continueClicked}> Continue </button>
        </div>
        <Route path={props.match.url + '/contact-data'} render={() => <ContactData orderClicked={props.orderClicked} />} />
    </div>
);

export default withRouter(checkoutSummary);