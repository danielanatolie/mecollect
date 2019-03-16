import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {userEmail} from './App';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_permissions: null
		}
	}

	componentDidMount() {
		this.getUserPermissions().then((data) => {
			console.log("data:");
			console.log(data);
		});
	}

	getUserPermissions = async () => {
		let email = "test1@gmail.com";

		// TODO: Change 'email' to 'userEmail'
		console.log("email: " + email);

		const response = await fetch("/api/getUserInfo", {
			method: "POST",
			headers: {
				"Content-Type": "aplication/json"
			},
			body: JSON.stringify({
				email: email
			})
		});
		
    const body = await response.json();
		if (response.status === 200) {
			console.log("SUCCESSFUL");
		}
		return body;
	};

	// getUserPermissions = async () => {
  //   var email = "test1@gmail.com";

  //   const response = await fetch("/api/permissions", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: email
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const body = await response.json();
  //   if (response.status === 200) {
	// 		console.log(body.data[0].permissions);
  //   }
  // };

  render() {
		let propertiesLink;
		// Check if user is a "seller"
		propertiesLink = <Link to='/properties'>My Properties</Link>;

		return (
			<div className="Header">
			<nav>
				<ul>
				<li><Link to='/'>Sign Out</Link></li>
				<li><Link to='/home'>Home</Link></li>
				<li><Link to='/account'>My Account</Link></li>
				<li><Link to='/buying_agreements'>Buying Agreements</Link></li>
				<li>{propertiesLink}</li>
				</ul>
			</nav>
			</div>
		);
  }
}

export default Header;
