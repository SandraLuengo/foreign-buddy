import React, { Component } from 'react';
import './Form2.css';
import NavBar from '../NavBar';

export default class Form2 extends Component {
  constructor() {
    super();
    this.state = {
      rol: '',
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
        <NavBar redirect={'/'} back={true} />
        <div className="containerForm2">
          <input
            className="botonUsuario"
            type="button"
            name="rol"
            value="buddy"
            onClick={e => this.sendInfo(e)}
          />
          <input
            className="botonBuddy"
            type="button"
            name="rol"
            value="user"
            onClick={e => this.sendInfo(e)}
          />
          </div>
      </div>
    );
  }
}
