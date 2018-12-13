// import React, { Component } from 'react';

import React from 'react';
import io from 'socket.io-client';
import './ChatWindow.css';
// import environment from "../../.env.development";

export default class ChatWindow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			messages:[],
			input:''
		};
	}

	//escucha el servidor, y llama a la funcion de pintar le mensaje cada vez que lo recibe
	componentDidMount(){
		console.log(1);
		this.socket = io('http://localhost:5000');
		this.socket.on('message', (msg)=> {
			console.log(1.1);
			this.receiveMessage(msg.msg);
		});
	}

	//cojo los mensajes del servidor (mios y de las demas personas y los renderizo en mi pagina)
	receiveMessage(msg){
		console.log(2);
		this.setState({
			input:'',
			messages: [...this.state.messages, {msg,type:'server'}]
		});
	}

	//envio el mensaje al servidor
	submitChat(){
		console.log(3);
		let msg = this.state.input;
		this.setState({
			input:'',
			messages: [...this.state.messages, {msg,type:'me'}]
		}, ()=> this.socket.emit('message',{msg, timestamp:Date.now()}));
        
	}
    
	//Pintamos los mensajes en el chat
	render(){
		let {messages, input} = this.state;
		return (
			// <div>{this.props.match.params.id}</div>
			<div style={{border:'1px solid green', padding:'10px'}} onKeyDown={e => e.keyCode==13 ? this.submitChat():null}>
				<div className="messages">
					{messages.map( (e,i) => <div className={'msg '+e.type} key={i}>{'msg '+e.type}<div className="wrap">{e.msg}</div></div>)}
				</div>
				<input value={input} onChange={e => this.setState({input:e.currentTarget.value})}/>
			</div>
		);
	}

}