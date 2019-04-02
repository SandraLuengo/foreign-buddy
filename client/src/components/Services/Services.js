import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import Loading from '../Loading';
import NavBar from '../NavBar';
import './Services.css'

export default class Services extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      place:null
    };

    this.authService = new AuthService();
  }

  componentWillMount = () => {
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ ...this.state, user }, () => {
        });
      })
      .catch();
  };
  openPlace = place => {
    this.setState({...this.state,place})
  }

  render() {
    return this.state.user && !this.state.redirect && !this.state.place ? (
      <div>
        <NavBar menuName={'Places'} style={'pink'}/>
        <div className="placesContainer">
          <div className="place" onClick={e=>this.openPlace('restaurants')}><img src="/images/places/Restaurants.svg"/></div>
          <div className="place" onClick={e=>this.openPlace('museums')}><img src="/images/places/Museum.svg"/></div>
          <div className="place" onClick={e=>this.openPlace('shops')}><img src="/images/places/Shopping.svg"/></div>
          <div className="place" onClick={e=>this.openPlace('local')}><img src="/images/places/Locals.svg"/></div>
          <div className="place" onClick={e=>this.openPlace('places')}><img src="/images/places/Interested.svg"/></div>
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : this.state.place?<Redirect  to={{ pathname:`/${this.state.place}`, state:{ place: this.state.place }}}/> : (
      <Loading/>
    );
  }
}
