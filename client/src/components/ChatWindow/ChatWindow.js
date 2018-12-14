
import React from 'react';
import io from 'socket.io-client';
import './ChatWindow.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default class ChatWindow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			messages:[],
			input:'',
			chat_id:''
			
		};
	}

	//escucha el servidor, y llama a la funcion de pintar le mensaje cada vez que lo recibe
	componentDidMount(){
		console.log('DidMount');
		if(this.props.location.chat_id){
			this.setState({...this.state,chat_id:this.props.location.chat_id.referrer},()=>{
				console.log(this.state.chat_id);
				this.socket = io('http://localhost:5000');
				//escucho en mi id
				this.socket.on(this.state.chat_id, (msg)=> {
			
					this.receiveMessage(msg.msg);
				});
			});
		}
		
	}

	//cojo los mensajes del servidor (mios y de las demas personas y los renderizo en mi pagina)
	receiveMessage(msg){
		
		this.setState({
			input:'',
			messages: [...this.state.messages, {msg,type:'server'}]
		});
	}

	//envio el mensaje al servidor
	submitChat(){
		console.log('envio',this.state.chat_id);
		let msg = this.state.input;
		this.setState({
			input:'',
			messages: [...this.state.messages, {msg,type:'me'}]
		}, ()=> this.socket.emit('message',{msg, timestamp:Date.now(),chat_id:this.state.chat_id}));
        
	}
    
	render(){

		let {messages, input} = this.state;
		return typeof  this.props.location.chat_id !== 'undefined' ?  (
			
			<div style={{border:'1px solid green', padding:'10px'}} onKeyDown={e => e.keyCode==13 ? this.submitChat():null}>
				<div className="messages">
					{messages.map( (e,i) => <div className={'msg '+e.type} key={i}>{'msg '+e.type}<div className="wrap">{e.msg}</div></div>)}
				</div>
				<div><Link to="/chat"><strong>X</strong></Link></div>
				<div>{this.props.chat_id}</div>
				<input value={input} onChange={e => this.setState({input:e.currentTarget.value})}/>
			</div>
		):<Redirect to="/chat"/>;
	}

}