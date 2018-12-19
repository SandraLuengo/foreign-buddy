import React, { Component } from 'react';
import './NavBar.scss';
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor() {
    super();
  }
  render() {
    return this.props&& (
      <div className='navBar'>
        <nav>
          <div className="firstNav"><Link to={`${this.props.redirect}`}>{this.props.back&&<img src="/images/icons/Atras.svg"/>}</Link></div>
          {!this.props.chat?
            <div className={`secondNav ${this.props.style}`}>{this.props.menuName}</div>
          :<div className={`secondNav ${this.props.style}`}><div className="imgContainer"><img src={this.props.userImg}/></div><div>{this.props.menuName}</div></div>
          }
          
          <div className="thirdNav"></div>
        </nav>
      </div>
    )
  }
}
