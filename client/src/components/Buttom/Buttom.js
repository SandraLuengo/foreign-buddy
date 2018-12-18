import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Buttom extends Component {
	render() {
		return (this.props.url) ? (
			<div>
				<Link to={this.props.url}>
					<button>{this.props.children}</button>
				</Link>
			</div>
		) : <div><button>{this.props.children}</button></div> ;
	}
}
