import React, { Component } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';

import Modal from './modal.js';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',

    showModal: false,
    signUp: false,
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  hideLoginModal = async e => {
    this.setState({
      showModal: false
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
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

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
