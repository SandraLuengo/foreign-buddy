import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import Loading from "../Loading";
import NavBar from "../NavBar";
import BuddiesService from "../BuddiesServer/BuddiesService";
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
        console.log(this.state.user)
        this.buddiesService.getBuddies(user)
        .then(buddies => {
            this.setState({ ...this.state, buddies },()=>{
              this.props.history.push('/chat');
            });
        });
      }) 
    })
    .catch(err=>console.log(err))
  }

  render() {
    return this.state.user && !this.state.redirect && this.state.buddies ? (
      <div>
        <NavBar menuName={'Buddys'} style={'pink'}/>
        <div className="buddiesContainer">
          <div className="navBuddy">
            {this.state.user.rol === 'user'?<div className="buddyCircle"><p>Socia Buddies</p></div>:''}
            <div className="buddyCircle lead"><p>Task Buddies</p></div>
          </div>
          <div className="underlineBuddy"><div className="first"></div><div className="second"></div></div>

          {this.state.user.rol === 'user'?this.state.buddies.map((buddy,i)=>{
            return  <div key={i} className="buddyPanel">
              <div><img className="buddiesImg" src={buddy.image} alt='img'/></div>
              <div><strong>{buddy.username} {buddy.surname}</strong></div>
              <div>{buddy.description}</div>
              <div><button name="buddy_id" id={buddy._id} value={buddy._id} onClick={e=>this.generateBuddy(e)}>Contact</button></div>
            </div>
          }):<p></p>}
          </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <Loading/>
    );
  }
}
