import React, { Component } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';

import Modal from './modal.js';
import Table from './table/table.js'
import { async } from 'rxjs/internal/scheduler/async';
import { Redirect, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      showModal: false,
      signUp: false,
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      properties: null,
      loginSuccess: false
    };
  }

  hideLoginModal = async e => {
    this.setState({
      showModal: false,
      loginSuccess: true
    });
  }
  
  showLoginModal = async e => {
    this.setState({
      showModal: true
    });
  }

  handleLoginInfo = async (
    input_signUp,
    input_email, 
    input_password, 
    input_firstname, 
    input_lastname) => {
    this.setState({
      signUp: input_signUp,
      email: input_email,
      password: input_password,
      firstname: input_firstname,
      lastname: input_lastname
    }, () => {
      this.handleLogin();
    })
  }
  
  handleLogin = async () => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        signUp:this.state.signUp
      })
    });
    const body = await response.text();
    this.setState({responseToPost:body});
    this.setState({showModal:false});
    window.user_email = this.state.email;
  };

  render() {
    console.log(this.state.properties);
    if (this.state.loginSuccess === true) {
      return <Redirect to={{
            pathname: '/home'
        }}    
      />
    }
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <div>
        <ReactBootstrap.Button type="button" onClick={this.showLoginModal}>
         Login
        </ReactBootstrap.Button>
        { this.state.showModal ? (
          <Modal 
            showModal={this.state.showModal} 
            hideLoginModal={this.hideLoginModal}
            submitForm={this.handleLoginInfo}
          />
        ) : null 
        } 
      <br />
      <br />
    </div>
  </div>
    );
  }
}

export default App;
