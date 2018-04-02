import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Redirect from="/" exact to="/burger-builder" />
            <Route path="/burger-builder" component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
