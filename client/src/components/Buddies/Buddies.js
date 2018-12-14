import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import BuddiesService from "../BuddiesServer/BuddiesService";
import TabBar from "../TabBar";

export default class Buddies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      buddies: ""
    };
    this.authService = new AuthService();
    this.buddiesService = new BuddiesService();
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
        this.setState({ ...this.state, user }, () => {
          this.getBuddiesData(user);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getBuddiesData = user => {
    this.buddiesService.getBuddies(user).then(buddies => {
      this.setState({ ...this.state, buddies });
    });
  };

  render() {
    console.log(this.state.buddies);
    return this.state.user && !this.state.redirect && this.state.buddies ? (
      <div>
        <h1>Buddies</h1>
        {this.state.buddies.map(buddy=><div><strong>My buddy: </strong>{buddy.username}</div>)}
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
