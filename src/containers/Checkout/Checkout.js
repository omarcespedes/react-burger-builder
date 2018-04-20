import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

  cancelClicked = () => {
    this.props.history.goBack();
  };

  continueClicked = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          cancelClicked={this.cancelClicked}
          continueClicked={this.continueClicked}
        />
      </div>
    );
  }
}

export default Checkout;
