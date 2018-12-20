import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import BuddiesService from "../BuddiesServer/BuddiesService";
import ChatService from "../ChatServer/ChatService";
import Loading from "../Loading";
import NavBar from "../NavBar";
import './Chat.scss';

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      chatUsers:'',
      chat_id:'',
      invited:''
    };
    this.authService = new AuthService();
    this.buddiesService = new BuddiesService();
    this.chatService = new ChatService();
  }
  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  componentDidMount = () => {
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ ...this.state, user },()=>{
          this.chatService.getChatUsers(user)
          .then(chatUsers=>{
            this.setState({ ...this.state, chatUsers });
          })
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  openChat = (e,id) => {
  
    this.chatService.createChatRoom(this.state.user._id,id)
    .then(chat_id=>{
      this.setState({...this.state,chat_id:chat_id.chat[0]._id,invited:id})

    })
  };


  render() {
 
    return this.state.user && !this.state.redirect && !this.state.chat_id ? (
      <div className="allChats">
        <NavBar menuName={'Chat'} style={'pink'}/>
        {this.state.chatUsers && this.state.chatUsers.length>0 ? this.state.chatUsers.map((user, i)=> {
          return <div key={i} onClick={e=>this.openChat(e,user._id)} className="chatBox">
            <div className="imgContainerChat"><img src={user.image}/></div>
              <div className="chat">
                <div><b>{user.username}</b></div>
                <div className="userDescription">{user.description}</div>
            </div>
          </div>
        }):<div className="imgNoChat"><img src="/images/ilustraciones/Ilustracion1-Chat.svg"/></div>}

      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : this.state.chat_id?<Redirect to={{pathname: '/newChat', chat_id: { 
      chat_id: this.state.chat_id,mainUser:this.state.user._id,
      invitedUser:this.state.invited,
      invited:this.state.chatUsers}}}/>:(
        <Loading/>
    );
  }
}
