import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Table from './table/table.js'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      selected: "Show All"
    }
  }

  componentDidMount() {
    this.getProperties('all')
      .then(data => this.setState({ properties: data}))
      .catch(err => console.log(err));
  }

  getProperties = async (propertyType) => {
    const response = await fetch('/api/properties', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({propertyType: propertyType})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.data;
  }

  redrawTable = async (val) => {
    this.getProperties(val.value)
      .then(data => this.setState({ properties: data, selected: val.label}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="Account">
        <Header />
        <h1>Welcome to MyPropeties!</h1>
        <div style={{float: "left", margin: 10}}>Property Type:</div>
        <div style={{width: 150, margin: 10}}>
          <Dropdown  options={[{value: 'all', label:'Show All'}, 
          {value: 'mansion', label: 'Mansion'}, 
          {value: 'apartment', label: 'Apartment'}]} 
          onChange={this.redrawTable} placeholder={this.state.selected}/>
        </div>
        <div id="properties">
          <Table properties={this.state.properties}></Table>
        </div>
      </div>
    );
  }
}

export default Account;
