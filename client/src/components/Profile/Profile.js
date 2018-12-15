import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import TabBar from "../TabBar";

export default class Profile extends Component {
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
        this.setState({ ...this.state, user });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    
    return this.state.user && !this.state.redirect ? (
      <div>
        {/* <h1> {this.state.user.username} </h1>
        <h1> {this.state.user.rol} </h1> */}
        
        <h3>{this.state.user.username}</h3>
        <button onClick={this.logOut}> Loguot </button>
        <div className="welcomBody">
          <TabBar />
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <p>Load</p>
    );
  }
}
