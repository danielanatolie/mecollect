import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';

class Account extends Component {
  render() {
    return (
      <div className="Account">
        <Header />
        <h1>Welcome to the home page</h1>
      </div>
    );
  }
}

export default Account;
