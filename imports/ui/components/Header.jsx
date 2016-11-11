import React, { Component } from 'react';


export default class Header extends Component {
  render() {
    return (
      <div className="col s12 m12 l10 offset-l1">
        <div>
          <header className="background-header text-center" id="welcome-header">
            <h1 className="center">Welcome to 32wav</h1>
          </header>
        </div>
      </div>
    )
  }
}
