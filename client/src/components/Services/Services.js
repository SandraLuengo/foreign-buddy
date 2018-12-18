import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import TabBar from "../TabBar";

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
      .catch(err => {
        console.log(err);
      });
  };
  openPlace = e => {
    this.setState({...this.state,place:e.target.value})
  }

  render() {
    return this.state.user && !this.state.redirect && !this.state.place ? (
      <div>
        <h1>Places</h1>
        <button value="museums" onClick={e=>this.openPlace(e)}>Museums</button>
        <button value="local" onClick={e=>this.openPlace(e)}>Local</button>
        <button value="shops" onClick={e=>this.openPlace(e)}>Shops</button>
        <button value="places" onClick={e=>this.openPlace(e)}>Places</button>
        <button value="restaurants" onClick={e=>this.openPlace(e)}>Restaurants</button>
        <div className="welcomBody">
          <TabBar />
        </div>
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : this.state.place?<Redirect  to={{ pathname:`/${this.state.place}`, state:{ place: this.state.place }}}/> : (
      <p>Load</p>
    );
    // return <p>hola</p>
  }
}
