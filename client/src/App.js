import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

import Modal from './modal.js';
import UserAccount from './Account';
import Table from './table/table.js'
import { async } from 'rxjs/internal/scheduler/async';

export var userEmail = 'test1@gmail.com';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      post: '',
      responseToPost: '',

      showModal: false,
      email: "",
      password: "",
      properties: null
    };
  }
  

  componentDidMount() {
    this.getProperties()
      .then(data => this.setState({ properties: data}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getProperties = async () => {
    const response = await fetch('/api/properties', {
      method: "GET"
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body.data;
  }

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
        password:this.state.password 
      })
    });
    const body = await response.text();
    this.setState({responseToPost:body});
    userEmail = this.state.email;
    ReactDOM.render(< UserAccount userEmail={this.state.email} />, document.getElementById('root'));
  };

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
        <div>
          <button 
            type='button'
            onClick={this.handleShowModalClick}>Login</button>
          {this.state.showModal ? (
            <Modal onClose={this.handleCloseModal}>
              <h1>Sign In</h1>
              <form onSubmit={this.handleModalSubmit}>
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  onChange={
                    e => 
                    this.setState({
                      email: e.target.value
                    })
                  }
                />
                <br />
                <label htmlFor="psw">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="psw"        
                  onChange={
                    e => 
                    this.setState({
                      password: e.target.value
                    })
                  }
                />
                <br />
                <button 
                type="submit">Submit</button>
              </form>
            </Modal>
          ) : null}
        </div>
        <Table properties={this.state.properties}></Table>


      </div>
    );
  }
}

export default App;
