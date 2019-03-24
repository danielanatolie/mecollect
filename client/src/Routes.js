import React, { Component } from 'react';
import App from './App.js';
import { Switch, Route } from 'react-router-dom';
import UserAccount from './Account.js';
import Main from './Main.js';
import BuyingAgreements from './BuyingAgreements';
import SellerProperties from './SellerProperties';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/home' component={Main}/>
        <Route path='/account' component={UserAccount} />
        <Route path='/buying_agreements' component={BuyingAgreements} />
		<Route path='/properties' component={SellerProperties} />
      </Switch>
    );
  }
}

export default Routes;
