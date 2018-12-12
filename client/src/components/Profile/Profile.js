import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
	  user: null,
	  redirect:false
    };
    this.authService = new AuthService();
  }
  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  componentWillMount = () => {
    this.authService.loggedin().then(user => {
	  this.setState({ ...this.state, user });
    });
  };

  render() {
	console.log(this.state.user)
    return this.state.user && !this.state.redirect ? (
      <div>
        <h1> {this.state.user.username} </h1>{" "}
        <button onClick={this.logOut}> Loguot </button>{" "}
      </div>
    ) :(this.state.redirect)?<Redirect to='/'/>:<p>Load</p>
  }
}
