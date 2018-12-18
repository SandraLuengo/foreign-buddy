import React, { Component } from 'react';
import './Form1.css';

export default class Form1 extends Component {
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
					type="text"t
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
				<div>
					<input type="text" name="day" placeholder="Day"  onChange={e => this.props.handleChange(e)} />
					<input type="text" name="month" placeholder="Month"  onChange={e => this.props.handleChange(e)} />
					<input type="text" name="year" placeholder="Year"  onChange={e => this.props.handleChange(e)} />
				</div>
				<select onChange={e => this.props.handleChange(e)} name="gender">
					<option value="">Select gender</option>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
				<button onClick={() => this.props.changeForm(2)}>
					{' '}
					{this.props.btn}{' '}
				</button>
			</div>
		);
	}
}
