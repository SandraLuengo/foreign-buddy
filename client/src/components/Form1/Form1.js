import React, { Component } from 'react';
import './Form1.css';
import NavBar from '../NavBar';

export default class Form1 extends Component {
	render() {
		return (
			<div className="form1">
				<NavBar redirect={'/'} back={true} />
				<div className="form1Container">
					<label>Name</label>
					<input
						required
						type="text"
						name="username"
						onChange={e => this.props.handleChange(e)}
					/>
					<label>Surname</label>
					<input
						type="text"t
						name="surname"
						onChange={e => this.props.handleChange(e)}
					/>
					<label>Email</label>
					<input required type="email"  name="email"  onChange={e => this.props.handleChange(e)} />
					<label>Password</label>
					<input
						required
						type="password"
						name="password"
						onChange={e => this.props.handleChange(e)}
					/>
					<label>Day</label>
					<div className="cumple">
						<input type="text" required name="day" placeholder="Day"  onChange={e => this.props.handleChange(e)} />
						<input type="text" required name="month" placeholder="Month"  onChange={e => this.props.handleChange(e)} />
						<input type="text" required name="year" placeholder="Year"  onChange={e => this.props.handleChange(e)} />
					</div>
					<select onChange={e => this.props.handleChange(e)} name="gender" required>
						<option value="">Select gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
					<div className="btnForm1"><button onClick={() => this.props.changeForm(2)}>
						{' '}
						{this.props.btn}{' '}
					</button></div>
				</div>
			</div>
		);
	}
}
