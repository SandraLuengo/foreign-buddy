import React, { Component } from "react";
import Buttom from "../Buttom";
import './Form2.css'

export default class Form2 extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      formNumber: 3
    };
  }

  sendInfo = e => {

	let change = new Promise((res,rej)=>res(this.props.handleChange(e)))

	change.then(()=>this.props.changeForm(3))
    
  };

  render() {
    return (
      <div className='form2'>
        FORM 2
        <input
          type="button"
          name="userType"
          value="buddy"
          onClick={e => this.sendInfo(e)}
        />
        <input
          type="button"
          name="userType"
          value="user"
          onClick={e => this.sendInfo(e)}
        />
      </div>
    );
  }
}
