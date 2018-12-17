import React, { Component } from "react";
import AuthService from "../Auth/AuthService";
import Form1 from "../Form1";
import Form2 from "../Form2";
import Form3 from "../Form3";
import Form3Buddy from "../Form3Buddy";
import { Redirect } from "react-router-dom";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formNumber: 1,
      username: "",
      surname: "",
      email: "",
      password: "",
      destination_country: "",
      destination_city: " ",
      origin_country: " ",
      spoken_languages: [],
      buddy_city: "",
      buddy_country: "",
      rol: "",
      interests: "",
      description: "",
      redirect: false,
      buddies: []
    };

    this.authService = new AuthService();
  }
  changeForm = formNumber => {
    this.setState({ ...this.state, formNumber }, () => {
      if (this.state.formNumber === "end") {
        this.authService
          .signup({ ...this.state })
          .then(user => {
            this.setState({
              username: " ",
              surname: " ",
              email: " ",
              password: " ",
              gender:" ",
              day:" ",
              month: " ",
              year: " ",
              destination_country: " ",
              destination_city: " ",
              origin_country: " ",
              spoken_languages: [],
              buddy_city: "",
              buddy_country: "",
              rol: " ",
              redirect: true,
              buddies: []
            });
          })
          .catch(err => console.log(err.message));
      }
    });
  };
  handleChange = e => {

    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addLanguage = e => {
    const { value } = e.target;
    this.state.spoken_languages.push(value);
  };

  render() {
    return !this.state.redirect ? (
      <div>
        {this.state.formNumber === 1 ? (
          <Form1
            handleChange={this.handleChange}
            changeForm={this.changeForm}
            btn={"Siguiente"}
          />
        ) : this.state.formNumber === 2 ? (
          <Form2
            changeForm={this.changeForm}
            handleChange={this.handleChange}
            btn={"Siguiente"}
          />
        ) : this.state.rol === "user" ? (
          <Form3
            addLanguage={this.addLanguage}
            handleChange={this.handleChange}
            changeForm={this.changeForm}
            btn={"Enviar"}
          />
        ) : (
          <Form3Buddy
            addLanguage={this.addLanguage}
            handleChange={this.handleChange}
            changeForm={this.changeForm}
            btn={"Enviar"}
          />
        )}{" "}
      </div>
    ) : (
      //  <Redirect to={{pathname:"/profile",state:{buddies:this.state.buddies}}} />
      <Redirect to="/chat" />
    );
  }
}
