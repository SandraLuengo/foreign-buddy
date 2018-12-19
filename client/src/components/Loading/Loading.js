import React, { Component } from 'react';
import './Loading.scss'

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src="/images/loading.gif"/>
      </div>
    )
  }
}
