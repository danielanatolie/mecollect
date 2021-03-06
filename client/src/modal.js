import * as ReactBootstrap from 'react-bootstrap';

import React, { Component } from "react";

import "./modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      permissions: "buyer", // Default is buyer
      button_title: "Select Account Type"
    };
  
}

handleDropdownSelect = async (key) => {
  this.setState({
    button_title: key,
    permissions: key.toLowerCase()
  });
}

 
  handleSubmit = async e => {
    e.preventDefault();
    this.props.submitForm(
      this.state.signUp, 
      this.state.email, 
      this.state.password, 
      this.state.firstname, 
      this.state.lastname,
      this.state.permissions
      );
  }

  render() {
    return (
    <div className="modal">
     <ReactBootstrap.Modal.Header closeButton onClick={this.props.hideLoginModal}>
        <ReactBootstrap.Modal.Title>Sign In</ReactBootstrap.Modal.Title>
      </ReactBootstrap.Modal.Header>
      <br />
      <ReactBootstrap.Form 
      onSubmit={this.handleSubmit}>
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Email</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="email"
              placeholder="Email"
              onChange={e => this.setState({
                email: e.target.value
              })}
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="password"
              placeholder="Password"
              onChange={e =>
                this.setState({
                  password: e.target.value,
                  signUp: false
                })
              }
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        <ReactBootstrap.Button variant="primary" type="submit">
          Login
        </ReactBootstrap.Button>
        <br/>
        <ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Title>Sign Up</ReactBootstrap.Modal.Title>
      </ReactBootstrap.Modal.Header>
      <br/>
      <ReactBootstrap.Form.Row>

      <ReactBootstrap.DropdownButton 
        title= {this.state.button_title}
        >
      <ReactBootstrap.Dropdown.Item 
      key="1"
      onSelect={e => this.handleDropdownSelect("Buyer")}>Buyer</ReactBootstrap.Dropdown.Item>
      <ReactBootstrap.Dropdown.Item 
        key="2"
        onSelect={e => this.handleDropdownSelect("Seller")}>Seller</ReactBootstrap.Dropdown.Item>
      <ReactBootstrap.Dropdown.Item key="3"
        onSelect={e => this.handleDropdownSelect("Agent")}>Agent</ReactBootstrap.Dropdown.Item>
      </ReactBootstrap.DropdownButton>

</ReactBootstrap.Form.Row>
<br/>

      <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Name</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              placeholder="First Name"
              onChange={e =>
                this.setState({
                  firstname: e.target.value,
                  signUp:true
                })
              }
            />
            <ReactBootstrap.Form.Control
              placeholder="Last Name"
              onChange={e =>
                this.setState({
                  lastname: e.target.value,
                  signUp:true
                })
              }
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br/>

        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Email</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="email"
              placeholder="Email"
              onChange={e =>
                this.setState({
                  email: e.target.value,
                  signUp:true
                })
              }
            />
             </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br/>
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="password"
              placeholder="Password"
              onChange={e =>
                this.setState({
                  password: e.target.value,
                  signUp:true
                })
              }
            />
          </ReactBootstrap.InputGroup>
        </ReactBootstrap.Form.Row>
        <br />
        
        <br />
        <ReactBootstrap.Button 
        variant="primary" 
        type="submit"
        >
        Register</ReactBootstrap.Button>
      </ReactBootstrap.Form>
    </div>
    
    )
  }
  
}


