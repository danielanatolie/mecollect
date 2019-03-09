import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <nav>
          <ul>
            <li><Link to='/'>Sign Out</Link></li>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/account'>My Account</Link></li>
            <li><Link to='/buying_agreements'>Buying Agreements</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
