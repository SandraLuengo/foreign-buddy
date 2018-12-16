import React, { Component } from 'react';

export default class NewService extends Component {
	constructor(){
		super();
	}
	render() {
		console.log(this.props.user);
		return (
			<div>
				<h1>New Service</h1>
				<div><input name="company" placeholder="Company name"/></div>
				<div><input name="adress" placeholder="Adress"/></div>
				<div>
					<select name="type">
						<option value="plumber">Plumber</option>
						<option value="electrical-technician">Electrical technician</option>
						<option value="locksmith">Locksmith</option>
						<option value="doctor">doctor</option>
					</select>
				</div>
			</div>
		);
	}
}
