import React, { Component } from 'react';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';

class DetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyNum: this.props.item ? this.props.item.propertynumber : '',
      price: this.props.item ? this.props.item.originalprice : '',
      address: this.props.item ? this.props.item.propertyaddress : '',
      yearBuilt: this.props.item ? this.props.item.yearbuilt : '',
      type: this.props.item ? this.props.item.propertytype : '',
      totalBeds: this.props.item ? this.props.item.totalbeds : '',
      totalBaths: this.props.item ? this.props.item.totalbaths : ''
    }
  }

  propertyNumHandler(e) {
    this.setState({ propertyNum: e.target.value });
  }

  priceHandler(e) {
    this.setState({ price: e.target.value });
  }

  addressHandler(e) {
    this.setState({ address: e.target.value });
  }

  yearBuiltHandler(e) {
    this.setState({ yearBuilt: e.target.value });
  }

  typeHandler(e) {
    this.setState({ type: e.target.value });
  }

  totalBedsHandler(e) {
    this.setState({ totalBeds: e.target.value });
  }

  totalBathsHandler(e) {
    this.setState({ totalBaths: e.target.value });
  }

  handleSaveEdit = async e => {
    e.preventDefault();
    this.props.submitForm(
      Number(this.state.propertyNum),
      Number(this.state.price),
      this.state.address,
      Number(this.state.yearBuilt),
      this.state.type,
      Number(this.state.totalBeds),
      Number(this.state.totalBaths)
    );    
  }

  render() {
    return (
      <div className="modal">
     <ReactBootstrap.Modal.Header closeButton onClick={this.props.onHide}>
        <ReactBootstrap.Modal.Title>Property Details</ReactBootstrap.Modal.Title>
      </ReactBootstrap.Modal.Header>
      <br />
      <ReactBootstrap.Form 
      onSubmit={this.handleSaveEdit}>
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Property number</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.propertyNum}
              onChange={e => this.setState({
                propertyNum: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Price (CAD)</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.price}
              onChange={e => this.setState({
                price: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Address</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.address}
              onChange={e => this.setState({
                address: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Year built</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.yearBuilt}
              onChange={e => this.setState({
                yearBuilt: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Type (eg. commercial, townhouse, etc.)</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.type}
              onChange={e =>
                this.setState({
                  type: e.target.value,
                })
              }
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Number of beds</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.totalBeds}
              onChange={e => this.setState({
                totalBeds: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Number of baths</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={this.props.readOnly}
              defaultValue={this.state.totalBaths}
              onChange={e => this.setState({
                totalBaths: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />

          {this.props.readOnly ? (
            null
          ) : (<ReactBootstrap.Button variant="primary" type="submit">
            Save Changes
              </ReactBootstrap.Button>)}
        <br/>
      </ReactBootstrap.Form>
    </div>
    );
  }
}

export default DetailsModal;
