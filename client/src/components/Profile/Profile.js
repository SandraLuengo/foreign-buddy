import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import ProfileService from "../ProfileServer/ProfileService";
import TabBar from "../TabBar";
import './Profile.css'

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redirect: false,
    };

    this.authService = new AuthService();
    this.profileService = new ProfileService();
  }

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

  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  editInterests = () => {
    this.props.history.push('/edit-interests');
  }

  editProfile = () => {
    this.props.history.push('/edit-profile');
  }

  render() {

    return this.state.user && !this.state.redirect ? (
      <div>
        <div className="photo">
          <img src={this.state.user.image}/>
          <div><span><strong>{this.state.user.username} </strong></span><span><strong>{this.state.user.surname}</strong></span></div>
          <p>{this.state.user.rol}</p>
          <button onClick={this.editProfile}>Edit</button>
          <button>Settings</button>
        </div>
        <div className="interestsInformation">
          <div>{this.state.user.interests}</div>
          <button onClick={this.editInterests}>Add interests</button>
        </div>
        <div className="description">
          <div>{this.state.user.description}</div>
        </div>
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
