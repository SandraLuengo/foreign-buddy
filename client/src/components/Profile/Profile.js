import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import ProfileService from "../ProfileServer/ProfileService";
import TabBar from "../TabBar";
import './Profile.css'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      interests:[]
    };
    this.authService = new AuthService();
    this.profileService = new ProfileService();
  }
  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

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

  editPhoto = e => {
  }

  editBasic = e => {
  }

  editInterests = e =>{
    document.querySelector('.interestList').className='interestListActive';
    document.querySelector('.saveInterest').style.display = "block";
  }

  addInterest = e => {
    console.log(e.target.name)
    var element = document.getElementsByName(e.target.name);
    element[0].classList.toggle("interestActive");
    let interestsArray = this.state.interests;
    interestsArray.push(e.target.name);
    this.setState({...this.state,interests:interestsArray})
  }

  saveInterests = e => {
    this.profileService
    .editInterests(this.state.interests,this.state.user)
    .then(resp=>console.log('guardado correctamente en la bbdd'))
    .catch(err=>console.log(err))
  }

  render() {
    
    return this.state.user && !this.state.redirect ? (
      <div>
        {/* <h1> {this.state.user.username} </h1>
        <h1> {this.state.user.rol} </h1> */}
        
        <div className="photo">
          <img src={this.state.user.image}/>
          <br/>
          <button onClick={e=>{this.editPhoto(e)}}>Edit</button>
        </div>
        <div className="basicInformation">
          <h3>{this.state.user.username}</h3>
          <p>{this.state.user.email}</p>
          <p>{this.state.user.rol}</p>
          <p>{this.state.user.rol=='user'?this.state.user.destination_country:this.state.user.buddy_country}</p>
          <p>{this.state.user.rol=='user'?this.state.user.destination_city:this.state.user.buddy_city}</p>
          <button onClick={e=>{this.editBasic(e)}}>Edit</button>
        </div>
        <div className="interests">
          <div className="interestList">
          <button className="" name='animals' value="animals" onClick={e=>{this.addInterest(e)}}>Animals</button>
          <button className="" name='nature' value="nature" onClick={e=>{this.addInterest(e)}}>Nature</button>
          <button className="" name='read' value="read" onClick={e=>{this.addInterest(e)}}>Read</button>
          <button className="" name='art' value="art" onClick={e=>{this.addInterest(e)}}>Art</button>
          <button className="" name='science' value="science" onClick={e=>{this.addInterest(e)}}>Science</button>
          </div>
            <br/>
          <button onClick={e=>{this.editInterests(e)}}>Edit</button>
          <button className="saveInterest" onClick={e=>{this.saveInterests(e)}}>Save</button>
        </div>
        <button onClick={this.logOut}> Loguot </button>
        <div className="welcomBody">
          <TabBar />
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <p>Load</p>
    );
  }
}
