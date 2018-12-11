import React, { Component } from "react";
import Form1 from "../Form1";
import Form2 from "../Form2";
import Form3 from "../Form3";
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
      userType: "",
      destination_country: ""
    };
  }
  changeForm = formNumber => {
    this.setState({ ...this.state, formNumber }, () => {
      if (this.state.formNumber === "end") {
        console.log("envio axios");
        console.log(this.state);
      }
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return this.state.formNumber !== "end" ? (
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
        ) : (
          <Form3
            handleChange={this.handleChange}
            changeForm={this.changeForm}
            btn={"Enviar"}
          />
        )}
      </div>
    ) : (
      <Redirect to="/profile" />
    );
  }
}
