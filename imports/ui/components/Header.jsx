import React, { Component } from 'react';



export default class Header extends Component {
  render() {
    return (
      <div>
      <div className="card-panel center" id="logo">       
        <img src="./phlogo.png" height="150px" />
        <p className="flow-text center-align">Highest Quality Tracks</p>
      </div>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="headerImg">
      <header className="background-header text-center" id="welcome-header">
          <h1 className="center">Welcome to 32wav</h1>
      </header>
      </div>
      </div>
    )
  }
}
