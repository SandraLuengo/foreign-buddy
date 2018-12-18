import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import BuddiesService from "../BuddiesServer/BuddiesService";
import TabBar from "../TabBar";
import "./Buddies.css"

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

  //Esto no tira bien
  componentDidMount () {
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ ...this.state, user }, () => {
          this.buddiesService.getBuddies(user).then(buddies => {
            this.setState({ ...this.state, buddies });
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  generateBuddy = e => {
    this.buddiesService.addNewBuddy(e.target.value,this.state.user)
    .then(user=>{
      this.setState({...this.state,user},()=>{
        this.buddiesService.getBuddies(user)
        .then(buddies => {
            this.setState({ ...this.state, buddies },()=>{
            });
        });
      }) 
    })
    .catch(err=>console.log(err))
  }

  render() {
    return this.state.user && !this.state.redirect && this.state.buddies ? (
      <div>
        <div className="navBuddy">
          {this.state.user.rol === 'user'?<p><strong>Socia Buddies</strong></p>:''}
          <p>Task Buddies</p>
        </div>
        {this.state.user.rol === 'user'?this.state.buddies.map((buddy,i)=>{
          return  <div key={i} className="buddyPanel">
            <div><img className="buddiesImg" src={buddy.image} alt='img'/></div>
            <div><strong>{buddy.username} {buddy.surname}</strong></div>
            <div>{buddy.description}</div>
            <div><button name="buddy_id" id={buddy._id} value={buddy._id} onClick={e=>this.generateBuddy(e)}>Contact</button></div>
          </div>
        }):<p></p>}
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
