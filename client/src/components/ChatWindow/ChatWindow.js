import React from 'react';
import io from 'socket.io-client';
import ChatService from '../ChatServer/ChatService';
import NavBar from '../NavBar';
import './ChatWindow.scss';

export default class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: { msg: [], type: '' },
      input: '',
      chat_id: '',
      mainUser: '',
      invitedUser: '',
	  messagesLoad: '',
	  otherUser:null
    };

    this.chatService = new ChatService();
  }

  componentDidMount = () => {
    if (this.props.location.chat_id) {
      let chat_id = this.props.location.chat_id.chat_id;
      let mainUser = this.props.location.chat_id.mainUser;
	  let invitedUser = this.props.location.chat_id.invitedUser;

	  this.paintAllMessages(chat_id);
      this.setState({ ...this.state, chat_id, mainUser, invitedUser }, () => {
		this.userData();
        this.socket = io(`${process.env.REACT_APP_API_URL}`);
        this.socket.on(this.state.chat_id, msg => {
          this.receiveMessage(msg);
        });
      });
    }
  };

  receiveMessage = msg => {
    this.setState({
      input: '',
      messages: { ...this.state.messages, msg, type: 'me' }
    });
  };


  userData = () => {

    if(this.props.location.chat_id.invited){
      let invitedArray = this.props.location.chat_id.invited;
      let otherUser = invitedArray.filter(invited=>{
        return invited._id==this.props.location.chat_id.invitedUser;
      });
      this.setState({...this.state,otherUser},()=>{
      })
    }

  }

  submitChat = () => {
    let msg = this.state.input;
    let msgArray = this.state.messages.msg;
    msgArray.push({
      message: msg,
      timestamp: Date.now(),
      chat_id: this.state.chat_id,
      author_Id: this.state.mainUser,
      invitedUser: this.state.invitedUser
    });

    this.setState(
      {
        input: '',
        messages: { ...this.state.messages, msg: msgArray, type: 'me' }
      },
      () =>
        this.socket.emit('message', {
          msg,
          timestamp: Date.now(),
          chat_id: this.state.chat_id,
          mainUser: this.state.mainUser,
          invitedUser: this.state.invitedUser
        })
    );
  };

  paintAllMessages = id_chat => {
    this.chatService.getMessages(id_chat).then(msg => {
      this.setState({
        input: '',
        messages: { ...this.state.messages, msg, type: 'me' }
      });
    });
  };


  render() {
	
    let { messages, input } = this.state;
    return typeof this.props.location.chat_id !== 'undefined' && this.state.otherUser? (
      
      <div>
        <NavBar chatImg={'chatImg'} redirect={'/chat'} chat={true} back={true} menuName={this.state.otherUser[0].username} userImg={this.state.otherUser[0].image}/>
        <div
          ref={el => {
            this.messagesContainer = el;
          }}
          id="chatContainer"
         
        >
          <div className="messages">
            {messages.msg.map((message, i) => {
              return (
                <div
                  className={
                    message.author_Id === this.state.mainUser
                      ? 'mainUser'
                      : 'invitedUser'
                  }
                  key={i}
                >
                  <div className="wrap">{message.message}</div>
                </div>
              );
            })}
          </div>
          <div>{this.props.chat_id}</div>
          <div className="containerEscribir">
            <input
              className="escribirChat"
              value={input}
              onChange={e => this.setState({ input: e.currentTarget.value })}
            />
            <img  onClick={e =>  this.submitChat() } className="enviar" src="/images/icons/send.svg"/>
          </div>
        </div>
      </div>
    ) : (
		<p>load</p>
    );
  }
}
