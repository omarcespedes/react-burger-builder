import React from 'react';
import Burger from '../../Burger/Burger';
import { Route, withRouter, Redirect } from 'react-router-dom';
import './CheckoutSummary.css';
import ContactData from '../../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

const checkoutSummary = (props) => {
    let content = <Redirect to="/" />
    if (props.ingredients.length) {
        const purchasedRedirect = props.purchased? <Redirect to="" /> : null;
        content = (
            <div className="checkout-summary">
                {purchasedRedirect}
                <Burger ingredients={props.ingredients} />
                <div>
                    <button onClick={props.cancelClicked}> Cancel </button>
                    <button onClick={props.continueClicked}> Continue </button>
                </div>
                <Route path={props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    }
    return content;
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.selectedIngredients,
        purchased: state.order.purchased
    }
}

export default withRouter(connect(mapStateToProps)(checkoutSummary));