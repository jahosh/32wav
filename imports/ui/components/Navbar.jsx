import React, { Component, PropTypes } from 'react';


//react components
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {




  render() {
    return (
      <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo right">{<AccountsUIWrapper />}</a>
       <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><a href="#home">Home</a></li>
        <li><a href="#account">My Account</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li><a href="#home">Home</a></li>
        <li><a href="#account">My Account</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
    )
  }
}