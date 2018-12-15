import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import BuddiesService from "../BuddiesServer/BuddiesService";
import ChatService from "../ChatServer/ChatService";
import TabBar from "../TabBar";

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      chatUsers:'',
      chat_id:''
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
    this.buddiesService.getChatUsers(user)
    .then(chatUsers=>{
      this.setState({ ...this.state, chatUsers });
    })
  }

  openChat = (e,id) => {
  
    this.chatService.createChatRoom(this.state.user._id,id)
    .then(chat_id=>{
      this.setState({...this.state,chat_id:chat_id.chat[0]._id})

    })
  };


  render() {
 
    return this.state.user && !this.state.redirect && !this.state.chat_id ? (
      <div>
        <h1>Chats</h1>
        {this.state.chatUsers?this.state.chatUsers.map(user=> <div onClick={e=>this.openChat(e,user._id)} style={{backgroundColor:'red'}}><div>{user.username}</div><div>{user._id}</div></div>):<div>No hay chats</div>}
        <div className="welcomBody">
          <TabBar/>
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : this.state.chat_id?<Redirect to={{pathname: '/newChat', chat_id: { chat_id: this.state.chat_id,mainUser:this.state.user._id,invitedUser:this.state.chatUsers[0]._id }}}/>:(
        <p>Load</p>
    );
  }
}
/*
if(user && !redirigir)
{
  muestra pagina
}
else if(redirect)
{
  redirecciono a raiz
}
else if(chat_id)
{
  redirecciona a chat windiw
}
else
{
  load
}

*/