import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import { userEmail } from './App';
import Table from './table/table.js';
import DetailsModal from './DetailsModal.js';

class SellerProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      email: userEmail,
      showModal: false,
      addedProperty: null
    }
    this.updateProperties = this.updateProperties.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.closeAdd = this.closeAdd.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
    this.getProperties()
      .then(data => this.setState({ properties: data.data}))
      .catch(err => console.log(err));
  }

  updateProperties(newProperties) {
    this.setState({
      properties: newProperties
    });
  }

  handleAdd() {
    this.setState({ showModal: true });
  }

  closeAdd() {
    this.setState({ showModal: false });
  }

  handleSubmitForm(propertyNumber, originalPrice, propertyAddress, yearBuilt, propertyType, numBeds, numBaths) {
    this.setState({
      addedProperty: {
          propertynumber: propertyNumber,
          originalprice: originalPrice,
          propertyaddress: propertyAddress,
          yearbuilt: yearBuilt,
          propertytype: propertyType,
          totalbeds: numBeds,
          totalbaths: numBaths
      }
    }, () => {
      this.addProperty();
    });
    this.closeAdd();
  }

  addProperty = async () => {
    try {
      fetch("/api/addProperty", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          propertyNumber: this.state.addedProperty.propertynumber,
          originalPrice: this.state.addedProperty.originalprice,
          propertyAddress: this.state.addedProperty.propertyaddress,
          yearBuilt: this.state.addedProperty.yearbuilt,
          propertyType: this.state.addedProperty.propertytype,
          totalbeds: this.state.addedProperty.totalbeds,
          totalbaths: this.state.addedProperty.totalbaths,
          ownerEmail: this.state.email
        })
      });
      this.setState({
        properties: this.state.properties.concat([this.state.addedProperty])
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        <button onClick={this.handleAdd}>Add new property</button>
        {this.state.showModal ? (
          <DetailsModal
            show={this.state.handleAdd}
            onHide={this.closeAdd}
            item={this.state.properties}
            readOnly={false}
            submitForm={this.handleSubmitForm}
          />
        ) : null}
        <Table updateProperties={this.updateProperties} properties={this.state.properties} editable={true}></Table>
      </div>
    );
  }
}

export default SellerProperties;
