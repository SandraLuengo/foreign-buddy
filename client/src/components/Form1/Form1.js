import React, { Component } from 'react';
import Buttom from '../Buttom';
import './Form1.css';

export default class Form1 extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			surname: '',
			email: '',
			password: ''
		};
	}

	render() {
		return (
			<div className="form1">
        FORM 1
				<input
					type="text"
					name="username"
					placeholder="Name"
					onChange={e => this.props.handleChange(e)}
				/>
				<input
					type="text"
					name="surname"
					placeholder="Surname"
					onChange={e => this.props.handleChange(e)}
				/>
				<input type="email" placeholder="Email" name="email"  onChange={e => this.props.handleChange(e)} />
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={e => this.props.handleChange(e)}
				/>
				{/* <div>
			<select name="day" size="5">
				{days.map((day,index)=>{
					return <option key={index} value={day}>{day}</option>
				})}
			</select>
		</div> */}
				<button onClick={() => this.props.changeForm(2)}>
					{' '}
					{this.props.btn}{' '}
				</button>
			</div>
		);
	}
}
