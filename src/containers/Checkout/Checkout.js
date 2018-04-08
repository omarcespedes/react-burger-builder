import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: []
  };

  componentWillMount() {
    if (this.props.location.state) {
      this.setState({
        ingredients: this.props.location.state.ingredients
      });
    }
  }

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
          ingredients={this.state.ingredients}
          cancelClicked={this.cancelClicked}
          continueClicked={this.continueClicked}
        />
      </div>
    );
  }
}

export default Checkout;
