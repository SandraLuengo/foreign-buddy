import React, { Component } from "react";
import Buttom from "../Buttom";

export default class Form2 extends Component {
  constructor() {
    super();
    this.state = {
		userType: "",
		formNumber:3
    };
  }
  chosenButton = userType => {
	this.setState({...this.state,userType},()=>{
		this.props.changeForm(this.state);
	})
	
  };
  render() {
    return (
      <div>
		  FORM 2
        <button onClick={()=>this.chosenButton('buddy')}>SOY BUDDY</button>
		<button onClick={()=>this.chosenButton('user')}>BUSCO BUDDY</button>
      </div>
    );
  }
}
