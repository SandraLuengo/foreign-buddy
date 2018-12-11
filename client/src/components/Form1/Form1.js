import React, { Component } from "react";
import Buttom from "../Buttom";

export default class Form1 extends Component {
  constructor() {
    super();
    this.state = {
		username: "",
		formNumber:2
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
	});
  };
  render() {
	//let days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    return (
      <div>
		  FORM 1
        <input
          type="text"
          name="username"
          onChange={e => this.handleChange(e)}
        />
		{/* <input
          type="text"
          name="surname"
          onChange={e => this.handleChange(e)}
        />
		<input
          type="email"
          name="email"
          onChange={e => this.handleChange(e)}
        />
		<input
          type="password"
          name="password"
          onChange={e => this.handleChange(e)}
        /> */}
		{/* <div>
			<select name="day" size="5">
				{days.map((day,index)=>{
					return <option key={index} value={day}>{day}</option>
				})}
			</select>
		</div> */}
        <button onClick={()=>this.props.changeForm(this.state)}> {this.props.btn} </button>
      </div>
    );
  }
}
