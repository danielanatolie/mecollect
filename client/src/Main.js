import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Table from './table/table.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      selected: "Show All",
      resultCount: 0,
      avg: '',
      boughtAllProperties: ''
    }
  }

  componentDidMount() {
    this.getProperties('all')
      .then(data => this.setState({ properties: data}))
      .catch(err => console.log(err));
    
    this.countProperties('all')
      .catch(err => console.log(err));

    this.getAvg();

    this.getBoughtAllProperties();
  }

  getBoughtAllProperties = async () => {
    const response = await fetch("/api/boughtAllProperties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.text();
    if (response.status === 200) {
      var data = (JSON.parse(body)).data;
      var members = '';
      for (var i = 0; i < data.length; i++) {
        members += data[i].accountname + ", ";
      }
      members = members.substring(0, members.length - 2);
      this.setState({ boughtAllProperties: members });
    }
  }; 

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

  countProperties = async (propertyType) => {
    const response = await fetch('/api/countProperties', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({propertyType: propertyType})
    });
    const body = await response.text();
    var json = (JSON.parse(body)).data[0];
    if (response.status !== 200) throw Error(body.message);
    this.setState({ resultCount: json.count });
  }

  getAvg = async () => {
    const response = await fetch('/api/avgProperties', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await response.text();
    if (response.status !== 200) throw Error(body.message);
    var avgs = (JSON.parse(body)).data;
    var text = 'Average Prices: ';
    for (var i = 0; i < avgs.length; i++) {
      var c = avgs[i].propertytype;
      text += c[0].toUpperCase() + c.slice(1) + ": "+ avgs[i].avg + ", ";
    }   
    text = text.substring(0, text.length - 2); 
    this.setState({ avg: text });
  }

  redrawTable = async (val) => {
    this.getProperties(val.value)
      .then(data => this.setState({ properties: data, selected: val.label}))
      .catch(err => console.log(err));
    
    this.countProperties(val.value)
      .catch(err => console.log(err));
  }

  render() {


    return (
      <div className="Account">
        <Header />
// <<<<<<< Alex
//         <h1>Welcome to MyPropeties!</h1>
//         <div style={{margin: 10}}>
//           <div>Members Who Bought All Properties: {this.state.boughtAllProperties == "" ? "No One!" : this.state.boughtAllProperties}</div>
//           <div>{this.state.avg}</div>
//           <div style={{float: "left"}}>Property Type:</div>
//           <div style={{width: 150}}>
//             <Dropdown  options={[{value: 'all', label:'Show All'}, 
//             {value: 'mansion', label: 'Mansion'}, 
//             {value: 'apartment', label: 'Apartment'}]} 
//             onChange={this.redrawTable} placeholder={this.state.selected}/>
//           </div>
//           <div>Number of results: {this.state.resultCount}</div>      
// ======= Combined with Master:
        
        <h1 style={{textAlign: 'center'}}>
        <img style={{width: 170, height:120}} src={ require('./images/highrise.png') } />
        <br />
        Welcome to MyProperties!</h1>
        <p style={{textAlign: 'center'}}>Buy, sell, and browse through thousands of luxurious properties.</p>
        <div>Members Who Bought All Properties: {this.state.boughtAllProperties == "" ? "No One!" : this.state.boughtAllProperties}</div>
        <div>{this.state.avg}</div>
        <div style={{float: "left", margin: 10}}>Property Type:</div>
        <div style={{width: 150, margin: 10}}>
          <Dropdown  options={[{value: 'all', label:'Show All'}, 
          {value: 'mansion', label: 'Mansion'}, 
          {value: 'apartment', label: 'Apartment'}]} 
          onChange={this.redrawTable} placeholder={this.state.selected}/>
// >>>>>>> master
        </div>
        <div id="properties">
          <Table properties={this.state.properties}></Table>
        </div>
      </div>
    );
  }
}

export default Main;
