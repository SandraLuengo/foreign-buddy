import React from 'react';
import io from 'socket.io-client';
import './ChatWindow.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import ChatService from '../ChatServer/ChatService';
import './ChatWindow.css';

export default class ChatWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: { msg: [], type: '' },
			input: '',
			chat_id: '',
			mainUser: '',
			invitedUser: '',
			messagesLoad: ''
		};

		this.chatService = new ChatService();
	}

  //escucha el servidor, y llama a la funcion de pintar le mensaje cada vez que lo recibe
  componentDidMount = () => {
  	window.addEventListener('scroll', this.handleScroll);
  	if (this.props.location.chat_id) {
  		let chat_id = this.props.location.chat_id.chat_id;
  		let mainUser = this.props.location.chat_id.mainUser;
  		let invitedUser = this.props.location.chat_id.invitedUser;
  		this.paintAllMessages(chat_id);
  		this.setState({ ...this.state, chat_id, mainUser, invitedUser }, () => {
  			this.socket = io(`${process.env.REACT_APP_API_URL}`);
  			this.socket.on(this.state.chat_id, msg => {
  				this.receiveMessage(msg);
  			});
  		});
  	}
  };

  //cojo los mensajes del servidor (mios y de las demas personas y los renderizo en mi pagina)
  receiveMessage = msg => {
  	this.setState({
  		input: '',
  		messages: { ...this.state.messages, msg, type: 'me' }
  	});
  };

  //envio el mensaje al servidor
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
  		console.log(msg);
  		this.setState({
  			input: '',
  			messages: { ...this.state.messages, msg, type: 'me' }
  		});
  	});
  };

  handleScroll = () => {
  	console.log('hol');
  };

  render() {
  	let { messages, input } = this.state;
  	return typeof this.props.location.chat_id !== 'undefined' ? (
  		<div
  			ref={el => {
  				this.messagesContainer = el;
  			}}
  			id="chatContainer"
  			style={{ border: '1px solid green', padding: '10px' }}
  			onKeyDown={e => (e.keyCode === 13 ? this.submitChat() : null)}
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
  			<div>
  				<Link to="/chat">
  					<strong>X</strong>
  				</Link>
  			</div>
  			<div>{this.props.chat_id}</div>
  			<input
  				value={input}
  				onChange={e => this.setState({ input: e.currentTarget.value })}
  			/>
  		</div>
  	) : (
  		<Redirect to="/chat" />
  	);
  }
}
