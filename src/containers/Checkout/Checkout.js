import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import axios from "../../burger-axios";

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

  orderClicked = e => {
    e.preventDefault();

    axios.post("/orders.json", {
      ingredients: this.state.ingredients,
      customer: {
        name: "Omar",
        lastName: "Cespedes",
        address: {
          street: "Parkway",
          zipCode: "12345"
        }
      }
    });
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelClicked={this.cancelClicked}
          continueClicked={this.continueClicked}
          orderClicked={this.orderClicked}
        />
      </div>
    );
  }
}

export default Checkout;
