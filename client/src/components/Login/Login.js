import React, { Component } from "react";
import AuthService from "../Auth/AuthService";
import { Redirect } from "react-router-dom";
import Buttom from "../Buttom";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
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
      <div>
        <h2> Login </h2>
        <form onSubmit={this.handleFormSubmit}>
          <label> Email </label>
          <input
            type="email"
            name="email"
            onChange={e => this.handleChange(e)}
          />
          <label> Password </label>
          <input
            type="password"
            name="password"
            onChange={e => this.handleChange(e)}
          />
          <button type="submit"> Login </button>
        </form>
      </div>
    ) : (
      <Redirect to={"/chat"} />
    );
  }
}
