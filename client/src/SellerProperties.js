import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import { userEmail } from './App';
import Table from './table/table.js';

class SellerProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      email: userEmail
    }
  }

  componentDidMount() {
    this.getProperties()
      .then(data => this.setState({ properties: data.data}))
      .catch(err => console.log(err));
  }

  getProperties = async () => {
    try {
			const response = await fetch('/api/propertiesByOwner', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email
				}),
			});
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
			return body;
		} catch (err) {
			console.log(err);
		}
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Seller's Properties</h1>
        <Table properties={this.state.properties}></Table>
      </div>
    );
  }
}

export default SellerProperties;
