import React, { Component } from 'react';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';

class BuyingDetailsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 'Visa',
      orderNumber: this.props.orderNumber,
      paymentNumber: this.props.paymentNumber
    }
  }

  paymentNumberHandler(e) {
    this.setState({ paymentNumber: e.target.value });
  }

  orderNumberHandler(e) {
    this.setState({ orderNumberHandler: e.target.value });
  }

  methodHandler(e) {
    this.setState({ methodHandler: e.target.value });
  }

  amountHandler(e) {
    this.setState({ amountHandler: e.target.value });
  }

  handleConfirm = async e => {
    e.preventDefault();
    this.props.submitForm(this.state.method);
  }

  render() {
    return (
      <div className="modal">
     <ReactBootstrap.Modal.Header closeButton onClick={this.props.onHide}>
        <ReactBootstrap.Modal.Title>Payment Details</ReactBootstrap.Modal.Title>
      </ReactBootstrap.Modal.Header>
      <br />
      <ReactBootstrap.Form 
      onSubmit={this.handleConfirm}>
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Your Balance (USD):</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={true}
              defaultValue={'$153,549,000'}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Method</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              defaultValue={"Visa"}
              onChange={e => this.setState({
                method: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Amount</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="text"
              readOnly={true}
              defaultValue={"$ " + this.props.curAmount}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
         <ReactBootstrap.Button variant="primary" type="submit"> Confirm </ReactBootstrap.Button>
        <br/>
      </ReactBootstrap.Form>
    </div>
    );
  }
}

export default BuyingDetailsModal;
