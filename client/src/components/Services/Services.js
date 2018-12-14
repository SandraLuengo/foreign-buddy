import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import ServiceService from "../ServiceServer/ServiceService";
import TabBar from "../TabBar";

export default class Services extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      services: ""
    };

    this.authService = new AuthService();
    this.serviceService = new ServiceService();
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
        this.setState({ ...this.state, user }, () => {
          this.getServicesData();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getServicesData = () => {
    this.serviceService.getServices().then(services => {
      this.setState({ ...this.state, services });
    });
  };

  render() {
    console.log(this.state.services);
    return this.state.user && !this.state.redirect && this.state.services ? (
      <div>
        <h1>Services</h1>
        <div>
          {this.state.services.map(service => {
            return (
              <div>
                <img style={{maxWidth:20}} src={service.image} />
                <div>{service.type}</div>
                <div>{service.company_name}</div>
                <div>{service.address}</div>
              </div>
            );
          })}
        </div>
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
