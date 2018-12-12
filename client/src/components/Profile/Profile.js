import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";

export default class Profile extends Component {
	constructor(){
		super();
		this.state = {
			user:''
		}
		this.authService = new AuthService();
	}
	componentDidMount = () => {

		this.authService.loggedin().then(user => {
			this.setState({ ...this.state, user });
		  });
	}
	render() {
		return (this.state.user!==' ')? (
			<div>
				<h1>{this.state.user.username}</h1>
			</div>
		):<Redirect to='/' /> ;
	}
}
