import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import BuddiesService from "../BuddiesServer/BuddiesService"
import TabBar from "../TabBar";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      buddies:''
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
        this.setState({ ...this.state, user },()=>{
          this.getChatData(user)
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  getChatData = user => {
    this.buddiesService.getBuddies(user)
    .then(buddies=>{
      this.setState({ ...this.state, buddies });
    })
  }

  openChat = (e,id) => {
    let path = `/newChat/${id}`;
    this.props.history.push(path)
    console.log(id)
  }

  render() {
    return this.state.user && !this.state.redirect  && this.state.buddies ? (
      <div>
        <h1>Chats</h1>
        {this.state.buddies.map(buddy=> <div onClick={e=>this.openChat(e,buddy._id)} style={{backgroundColor:'red'}}><div>{buddy.username}</div><div>{buddy._id}</div></div>)}
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
