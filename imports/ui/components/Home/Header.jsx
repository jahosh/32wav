import React, { Component } from 'react';


export default class Header extends Component {
  render() {
    return (
      <div className="col s12 m12 l10 offset-l1">
        <div>
          <header className="background-header text-center hide-on-small-only" id="welcome-header">
          </header>
          <h1 className="center-align show-on-small hide-on-med-and-up">32wav</h1>
        </div>
      </div>
    )
  }
}
