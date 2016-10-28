import React, { Component } from 'react';



export default class Header extends Component {
  render() {
    return (

    <nav className="indigo">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo center">32wav</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
        </ul>
      </div>
    </nav>
      /*
      <div className="col s12 m12 l12 mainNav">
        <div className="headerText valign center">
          <h1> 32wav</h1>
          <small>Hottest Beats Online</small>
        </div>
        <a
          className="dropdown-button btn genreDropDown" 
          href="#" 
          data-activates="dropdown1"
          data-beloworgin="true"> Genres
        </a>

        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">Trap</a></li>
          <li><a href="#!">R&B</a></li>
          <li><a href="#!">Hip-Hop</a></li>
        </ul>
      </div>
      */
    )
  }
}
