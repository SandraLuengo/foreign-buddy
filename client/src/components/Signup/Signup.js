import React, { Component } from 'react';
import Form1 from '../Form1';
import Form2 from '../Form2';
import Form3 from '../Form3';

export default class Signup extends Component {
	constructor() {
		super();
		this.state={
			formNumber:1,
			username:'',
			userType:'',
			destination_country:''
		};
	}
	changeForm = (state) => {
		console.log(state);
		this.setState({...this.state,state});
		if(this.state.formNumber==='end'){
			console.log('envio axios');
			console.log(this.state);
		}

	}
	render() {
		console.log(this.state);
		return (
			<div>
				{(this.state.formNumber===1)?<Form1 changeForm={this.changeForm} btn={'Siguiente'}/>:(this.state.formNumber===2)?
					<Form2 changeForm={this.changeForm}  btn={'Siguiente'}/>:<Form3 changeForm={this.changeForm} btn={'Enviar'}/>}	
			</div>
		);
	}
}
