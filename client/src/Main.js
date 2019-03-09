import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Table from './table/table.js'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null
    }
  }

  componentDidMount() {
    this.getProperties()
      .then(data => this.setState({ properties: data}))
      .catch(err => console.log(err));
  }

  getProperties = async () => {
    const response = await fetch('/api/properties', {
      method: "GET"
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.data;
  }

  render() {
    return (
      <div className="Account">
        <Header />
        <h1>Welcome to MyPropeties!</h1>
        <Table properties={this.state.properties}></Table>
      </div>
    );
  }
}

export default Account;
