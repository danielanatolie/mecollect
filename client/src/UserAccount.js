import React, { Component } from 'react';
import './UserAccount.css';
import {userEmail} from './App.js';

class UserAccount extends Component { 
    state = {
        response: '',
        post: '',
        responseToPost: '',
        userAccountName: '',
        userPermissions: '',
        userPhoneNumber: '',
        numOrders: 0,
        orders: [],
        email: userEmail,
        nameStatus: 'Fail',
        passwordStatus: 'Fail',
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
        const response = await fetch('/api/getUserInfo/' + this.state.email, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        var info = (JSON.parse(body)).userInfo[0];
        this.setState({ userPermissions: info.permissions, 
            userAccountName: info.accountname,
            userPhoneNumber: info.phone
         });
      };

      getOrderDetails = async () => {
        const response = await fetch('/api/getUserOrders/' + this.state.email, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        var info = JSON.parse(body);
        this.setState({ orders: info.orders, numOrders: 1 });
      };

      updatePassword = async () => {
        if (this.state.newUserPassword != '') {
            const response = await fetch('/api/updateUserPassword/' + this.state.newUserPassword + '/' + this.state.email, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post: this.state.post }),
            });
            const body = await response.text();
            this.setState({ passwordStatus: 'Success' });
        }
      }

      updateUserName = async e => {
        if (this.state.newUserName != '') {  
            e.preventDefault();
            const response = await fetch('/api/updateUserName/' + this.state.newUserName + '/' + this.state.email, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post: this.state.post }),
            });
            const body = await response.text();
            this.setState({ nameStatus: 'Success' });
        }
      }
    
    render() {
        var rows = [];
        for (var i = 0; i < this.state.numOrders; i++) {
            var order = this.state.orders[i];
            rows.push(
            <tr>
                <td>{order.ordernumber}</td>
                <td>{order.date}</td>
                <td>{order.listedprice}</td>
                <td>{order.propertyNumber}</td>
                <td>{order.method}</td>
                <td>{order.amount}</td>
            </tr>);
        }
        return (
            <div>
                <div>
                    <div>USER ACCOUNT: {this.state.email}</div>
                    <div>Account Permissions: {this.state.userPermissions}</div>
                    <div>Account Name: {this.state.userAccountName}</div>
                    <div>Account Phone Number: {this.state.userPhoneNumber}</div>
                </div>
                <div>
                    <div>ORDER DETAILS: </div>
                    <div>{this.state.responseToPost}</div>
                    <table id="OrdersTable" className="OrdersTable">
                        <tr>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Listed Price</th>
                            <th>Property Number</th>
                            <th>Payment Method</th>
                            <th>Payment Amount</th>
                        </tr>
                        {rows}
                    </table>
                </div>
                <div>
                    <input onChange={
                    e => 
                    this.setState({
                      newUserName: e.target.value
                    })
                  } type='text'></input>
                    <button type='button' onClick={this.updateUserName}>Update User Name</button>
                </div>
                <div>User Name Status: {this.state.nameStatus}</div>
                <div>
                    <input onChange={
                    e => 
                    this.setState({
                      newUserPassword: e.target.value
                    })
                  } type='text'></input>
                    <button onClick={this.updatePassword}>Update Password</button>
                </div>
                <div>Password Status: {this.state.passwordStatus}</div>
            </div>
        );
    } 
}

export default UserAccount;