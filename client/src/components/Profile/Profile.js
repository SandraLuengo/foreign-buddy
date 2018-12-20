import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import ProfileService from '../ProfileServer/ProfileService';
import Loading from '../Loading';
import NavBar from '../NavBar';
import './Profile.css';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      redirect: false,
    };

    this.authService = new AuthService();
    this.profileService = new ProfileService();
  }

  componentWillMount = () => {
    this.authService
        .loggedin()
        .then(user => {
        this.setState({ ...this.state, user });
        })
        .catch(err => {
        console.log(err);
        });
  };

  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  editInterests = () => {
    this.props.history.push('/edit-interests');
  }

  editProfile = () => {
    this.props.history.push('/edit-profile');
  }

  render() {

    return this.state.user && !this.state.redirect ? (
      <div>
        <NavBar menuName={'Profile'} style={'pink'}/>
        <div className="profileContainer">
          <div className="photos">
            <div className="imgContainer"><img src={this.state.user.image} alt='img'/></div>
            <div><span><strong>{this.state.user.username} </strong></span><span><strong>{this.state.user.surname}</strong></span></div>
            <div className="profileBtn">
              <div className="btnEdit1" onClick={this.editProfile}><div><img src="images/icons/EDITINFO.svg"/></div><div>Edit Info</div></div>
              <div className="btnEdit1"><div><img src="images/icons/SETTINGS.svg"/></div><div>Settings</div></div>
            </div>
          </div>
          <div className="interestsInformation">
            {/* {this.state.user.interests?this.state.user.interests.map((item, i)=><div key={i}>{item}</div>):<p></p>} */}
            <div className="porcentajeContainer"><img src="/images/ñapa.png"/></div>
            <div className="editInterest" onClick={this.editInterests}>Edit Interests</div>
          </div>
          <div className="description">
            <div className="descriptionContainer">{this.state.user.description}</div>
          </div>
          <div className="divBtnContainer">
            <button className="Loguot" onClick={this.logOut}>Log Out</button>
          </div>
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <Loading/>
    );
    // return <Loading/>
  }
}
