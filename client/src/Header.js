import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { userEmail } from './App';

class Header extends Component {
	state = {
		email: userEmail,
		permissions: ""
	};

	componentDidMount() {
		this.getUserPermissions().then((data) => {
			this.setState({
				permissions: data.userInfo[0].permissions
			});
		});
	}

	getUserPermissions = async () => {
		try {
			const response = await fetch('/api/getUserInfo', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email
				}),
			});
			const body = await response.json();
			return  body;
		} catch (err) {
			console.log(err);
		}
	};

  render() {
		let propertiesLink;
		if (this.state.permissions === "seller") {
			propertiesLink = <Link to='/properties'>My Properties</Link>;
		} else {
			propertiesLink = null;
		}

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
