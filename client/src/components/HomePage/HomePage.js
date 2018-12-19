import React, { Component } from 'react';
import Buttom from '../Buttom';
import './HomePage.scss'

export default class HomePage extends Component {	
	
	render() {
		return (
			<div className="homePage">
				<h1>PAGINA DE INICIO</h1>
				<Buttom url={'/signup'}>Sigup</Buttom>
				<Buttom url={'/login'}>Login</Buttom>
			</div>
		);
	}
}
