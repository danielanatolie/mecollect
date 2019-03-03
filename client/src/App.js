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

  handleShowModalClick = async () => {this.setState({ showModal: true })};
  
  handleCloseModal = async () => {this.setState({ showModal: false })};
  
  handleModalSubmit = async e => {
    e.preventDefault();
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
  <ReactBootstrap.Button type="button" onClick={this.handleShowModalClick}>
    Login
  </ReactBootstrap.Button>
  {this.state.showModal ? (
    <Modal onClose={this.handleCloseModal}>
      <ReactBootstrap.Modal.Header closeButton onClick={this.handleCloseModal}>
        <ReactBootstrap.Modal.Title>Sign In</ReactBootstrap.Modal.Title>
      </ReactBootstrap.Modal.Header>
      <br />
      <ReactBootstrap.Form 
      onSubmit={this.handleModalSubmit}>
        <ReactBootstrap.Form.Row>
          <ReactBootstrap.Form.Label>Email</ReactBootstrap.Form.Label>
          <ReactBootstrap.InputGroup>
            <ReactBootstrap.Form.Control
              type="email"
              placeholder="Email"
              onChange={e =>
                this.setState({
                  email: e.target.value,
                  signUp: false
                })
              }
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
        <ReactBootstrap.Button 
        variant="primary" 
        type="submit"
        >
        Register</ReactBootstrap.Button>
      </ReactBootstrap.Form>
    </Modal>
  ) : null}
  <br />
  <br />
</div>




      </div>
    );
  }
}

export default App;
