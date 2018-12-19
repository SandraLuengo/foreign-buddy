import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TabBar.scss";

export default class TabBar extends Component {
  constructor() {
    super();
  }
  render() {
    let activePage = this.props.path && this.props.path.replace("/", "");
    return activePage ? (
      <nav className={`${this.props.showHide} ${activePage}`}>
        <div className="tabBar">
          <div className="chat">
            <Link to="/chat">
              <div className="icon">
                <img className="hidden" src="/images/tabBar/Chat.svg" />
                <img className="show" src="/images/tabBar/Chat_on.svg" />
                <div>Chat</div>
              </div>
            </Link>
          </div>

          <div className="buddies">
            <Link to="/buddies">
              <div className="icon">
                <img className="hidden" src="/images/tabBar/Logo.svg" />
                <img className="show" src="/images/tabBar/Logo_on.svg" />
                <div>Buddy</div>
              </div>
            </Link>
          </div>
          <div className="places">
            <Link to="/place">
              <div className="icon">
                <img className="hidden" src="/images/tabBar/Lugar.svg" />
                <img className="show" src="/images/tabBar/Lugar_on.svg" />
                <div>Places</div>
              </div>
            </Link>
          </div>
          <div className="profile">
            <Link to="/profile">
              <div className="icon">
                <img className="hidden" src="/images/tabBar/Perfil.svg" />
                <img className="show" src="/images/tabBar/Perfil_on.svg" />
                <div>Profile</div>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    ) : (
      <p></p>
    );
  }
}
