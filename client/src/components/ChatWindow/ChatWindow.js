
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
			chat_id:'',
			mainUser:'',
			invitedUser:''
			
		};
	}

	//escucha el servidor, y llama a la funcion de pintar le mensaje cada vez que lo recibe
	componentDidMount(){

		if(this.props.location.chat_id){
	
			let chat_id=this.props.location.chat_id.chat_id;
			let mainUser=this.props.location.chat_id.mainUser;
			let invitedUser=this.props.location.chat_id.invitedUser;
			this.setState({...this.state,chat_id,mainUser,invitedUser},()=>{
				console.log(this.state);
				this.socket = io(`${process.env.REACT_APP_API_URL}`);
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
		}, ()=> this.socket.emit('message',{msg, timestamp:Date.now(),chat_id:this.state.chat_id,mainUser:this.state.mainUser,invitedUser:this.state.invitedUser}));
        
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