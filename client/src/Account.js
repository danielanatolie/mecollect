import React, { Component } from 'react';
import Header from './Header';
import AccountTable from './table/accountTable';
import { Button } from 'react-bootstrap';
import './UserAccount.css';
import {userEmail} from './App';

class UserAccount extends Component {
    state = {
        response: '',
        post: '',
        responseToPost: '',
        userAccountName: '',
        userPermissions: '',
        userPhoneNumber: '',
        orders: null,
        email: userEmail,
        nameStatus: '',
        passwordStatus: '',
        newUserName: '',
        newUserPassword: ''
      };

    componentDidMount() {
        this.getAccountDetails();
        this.getOrderDetails();
    }  

    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      };
    
    getAccountDetails = async () => {
        const response = await fetch('/api/getUserInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.state.email }),
        });
        const body = await response.text();
        var info = (JSON.parse(body)).userInfo[0];
        this.setState({ userPermissions: info.permissions, 
            userAccountName: info.accountname,
            userPhoneNumber: info.phone
         });
      };

      getOrderDetails = async () => {
        const response = await fetch('/api/getUserOrders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.state.email }),
        });
        const body = await response.text();
        console.log("Inside getOrderDetails: ");
        console.log(JSON.parse(body).data);
        this.setState({ orders: JSON.parse(body).data });
      };

      updatePassword = async () => {
        if (this.state.newUserPassword !== '') {
            const response = await fetch('/api/updateUserPassword', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  email: this.state.email,
                  newPassword: this.state.newUserPassword
                }),
            });
            const body = await response.text();
            this.setState({ passwordStatus: JSON.parse(body).status });
        }
      }

      updateUserName = async e => {
        if (this.state.newUserName !== '') {
            e.preventDefault();
            const response = await fetch('/api/updateUserName', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                  email: this.state.email,
                  newUserName: this.state.newUserName
                }),
            });
            const body = await response.text();
            this.setState({ nameStatus: JSON.parse(body).status, userAccountName: this.state.newUserName });
        }
      }
    
    render() {
        return (   
            <div>
              <Header/>
                <div>
                    <div>USER ACCOUNT: {this.state.email}</div>
                    <div>Account Permissions: {this.state.userPermissions}</div>
                    <div>Account Name: {this.state.userAccountName}</div>
                    <div>Account Phone Number: {this.state.userPhoneNumber}</div>
                </div>
                <div>
                    <input onChange={
                    e => 
                    this.setState({
                      newUserName: e.target.value
                    })
                  } type='text'></input>
                    <Button type='button' onClick={this.updateUserName}>Update User Name</Button>
                </div>
                <div>{this.state.nameStatus}</div>
                <div>
                    <input onChange={
                    e => 
                    this.setState({
                      newUserPassword: e.target.value
                    })
                  } type='text'></input>
                    <Button onClick={this.updatePassword}>Update Password</Button>
                </div>
                <div>{this.state.passwordStatus}</div>
                <div>
                    <div>ORDER DETAILS: </div>
                    <div>{this.state.responseToPost}</div>
                    <AccountTable orders={this.state.orders}></AccountTable>
                </div>
            </div>
        );
    } 
}

export default UserAccount;