import React, { Component } from 'react';
import Buttom from '../Buttom';

export default class HomePage extends Component {	
	render() {
		return (
			<div>
				<h1>PAGINA DE INICIO</h1>
				<Buttom url={'/signup'}>Sigup</Buttom>
				<Buttom url={'/login'}>Login</Buttom>
			</div>
		);
	}
}
