import React, { Component } from 'react';
import './NavBar.scss';
import { Link,Redirect } from 'react-router-dom';

export default class NavBar extends Component {
  constructor() {
    super();
  }
  render() {
    return this.props&& (
      <div className={`navBar ${this.props.background}`} >
        <nav>
          <div className="firstNav"><Link  to={{ pathname:`${this.props.redirect}`, state:{ place: this.props.placeData }}}>
          {this.props.back&&<img className="backArrow" src="/images/icons/Atras.svg"/>}
          </Link>
          </div>
          {!this.props.chat?
            <div className={`secondNav ${this.props.style}`}>{this.props.menuName}</div>
          :<div className={`secondNav ${this.props.style}`}><div className={`imgContainer ${this.props.chatImg}`}><img src={this.props.userImg}/></div><div>{this.props.menuName}</div></div>
          }
          
          <div  className={`thirdNav ${this.props.style2}`} onClick={e=>this.props.save(e)}>{this.props.arrow}</div>
        </nav>
      </div>
    )
  }
}
