import React, { Component } from 'react';
import App from './App.js';
import { Switch, Route } from 'react-router-dom';
import Account from './Account.js';
import Main from './Main.js';
import BuyingAgreements from './BuyingAgreements';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/home' component={Main}/>
        <Route path='/account' component={Account} />
        <Route path='/buying_agreements' component={BuyingAgreements} />
      </Switch>
    );
  }
}

export default Routes;
