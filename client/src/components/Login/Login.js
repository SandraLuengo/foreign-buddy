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
      redirect: false,
      loggin:false
    };

    this.authService = new AuthService();
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password,rol } = this.state;

    this.authService.login(email, password,rol)
    .then(user => {
      this.setState({ ...this.state, redirect: true });
    })
    .catch(err=>{
      this.setState({ ...this.state, loggin: true });
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
        <NavBar redirect={'/'}  back={true}/>
        {/* <div><img src="/images/ilustraciones/loginBackground.svg"/></div>
         */}
        <div className="loginHeader">
          <div className="loginText">Login</div>
        </div>
        <div className="loginImg">
          <img id="pluma" src="/images/loginBackground/leaf.svg"/>
          <img id="rama" src="/images/loginBackground/leafTop.svg"/>
          <img id="oval" src="/images/loginBackground/oval.svg"/>
          <img id="cuadrado" src="/images/loginBackground/polygon.svg"/>
        </div>
        <form className="loginForm" onSubmit={this.handleFormSubmit}>
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
          {this.state.loggin&&<div className="logginError">The email or password are not correct</div>}
          <div className="btnContainer btnLogin"><button type="submit"> Login </button></div>
        </form>
      </div>
    ) : (
      <Redirect to={'/chat'} />
    );
  }
}
