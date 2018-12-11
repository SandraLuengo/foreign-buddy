import React, { Component } from "react";
import Buttom from "../Buttom";

export default class Form3 extends Component {
  constructor() {
    super();
    this.state = {
	  destination_country: "",
	  formNumber:"end"
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        FORM 3
        <select name="destination_country" onChange={e => this.handleChange(e)}>
          <option value="España"> España </option>
          <option value="Francia"> Francia </option>
        </select>
        <button onClick={() => this.props.changeForm(this.state)}>
          Enviar
        </button>
      </div>
    );
  }
}
