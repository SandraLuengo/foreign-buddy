import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import { Redirect } from 'react-router-dom';
import NavBar from '../NavBar';
import './Login.css'

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      redirect: false
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password,rol } = this.state;

    this.authService.login(email, password,rol).then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return !this.state.redirect ? (
    
      <div className="loginContainer">
        <NavBar redirect={'/'} back={true} background={'transparent'}/>
        <div><img src="/images/ilustraciones/loginBackground.svg"/></div>  
        <form onSubmit={this.handleFormSubmit}>
          <label> Email </label>
          <input
            required
            type="email"
            name="email"
            onChange={e => this.handleChange(e)}
          />
          <label> Password </label>
          <input
            required
            type="password"
            name="password"
            onChange={e => this.handleChange(e)}
          />
          <div className="btnContainer"><button type="submit"> Login </button></div>
        </form>
      </div>
    ) : (
      <Redirect to={'/chat'} />
    );
  }
}
