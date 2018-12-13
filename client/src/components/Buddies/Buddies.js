import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import TabBar from "../TabBar"

export default class Buddies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false
    };
    this.authService = new AuthService();
  }
  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  componentWillMount = () => {
    this.authService
      .loggedin()
      .then(user => {
        console.log("Loged In");
        console.log(user);
        this.setState({ ...this.state, user });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    
    return this.state.user && !this.state.redirect ? (
      <div>
		<h1>Buddies</h1>
		<div className="welcomBody">
		<TabBar/>
		</div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <p>Load</p>
    );
  }
}
