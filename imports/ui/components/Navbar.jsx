import React, { Component, PropTypes } from 'react';


//react components
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper indigo">
          <a href="#" className="brand-logo center">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
          <form>
            <div className="input-field">
              <input id="search" type="search" required />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
  </nav>

      /*
      <div className="col s12">
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="userView">
            <img className="background" />
            <a href="#!user"><img className="circle" src="./assets/josh.JPG" /></a>
            <a href="#!name"><strong><span className="black-text name">Jahosh</span></strong></a>
            <a href="#!email"><span className="black-text email">jahosh@32wav.com</span></a>
            <span className="black-text" id="userName"></span>
          </div></li>
          <li><i className="material-icons">assignment_ind</i><AccountsUIWrapper /></li>
          <li><div className="divider"></div></li>
          <li><a href="/"><i className="material-icons">perm_identity</i>Home</a></li>
          <li><a href="#!"><i className="material-icons">cloud</i>My Uploads</a></li>
          <li><a href="#faq"><i className="material-icons">question_answer</i>FAQ</a></li>
          <li><a href="/contact"><i className="material-icons">email</i>Contact</a></li>       
        </ul>
      </div>
      */
    )
  }
}

Navbar.PropTypes = {

}