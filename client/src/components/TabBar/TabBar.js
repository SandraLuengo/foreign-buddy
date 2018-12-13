import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './TabBar.css';

export default class TabBar extends Component {
	render() {
		return (
			<nav className="tabBar">
				<ul>
					<li><Link to='/chat'>Chat</Link></li>
					<li><Link to='/buddies'>Buddies</Link></li>
					<li><Link to='/services'>Servicios</Link></li>
					<li><Link to='/profile'>Perfil</Link></li>
				</ul>
			</nav>
		);
	}
}
