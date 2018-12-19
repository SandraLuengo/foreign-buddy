import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TabBar.css';

export default class TabBar extends Component {
	render() {
		return (
			<nav className={this.props.showHide}>
				<div className="tabBar">
					<div><Link to='/chat'>Chat</Link></div>
					<div><Link to='/buddies'>Buddies</Link></div>
					<div><Link to='/services'>Servicios</Link></div>
					<div><Link to='/profile'>Perfil</Link></div>
				</div>
			</nav>
		);
	}
}
