import React, { Component, PropTypes } from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';
import {Router, Route, Link, IndexLink } from 'react-router';


//react components
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {
  componentDidMount() {
  // Initialize collapse button
  $(".button-collapse").sideNav();      
  }
  render() {
    return (
      <nav className="light-blue darken-4 topNav">
        <div className="nav-wrapper">
          <ul className="right">
            <li><Blaze template="loginButtons" align="right" /></li>
          </ul>
          <a href="#" className="brand-logo center">32wav</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/upload" activeClassName="active">Upload</Link></li>
            <li><Link to="/myaccount" activeClassName="active">My Account</Link></li>
            <li><a href="#">FAQ</a></li>
            <li><Link to="/contact" activeClassName="active">Contact</Link></li>
          </ul>
          <ul className="side-nav links" id="mobile-demo">
            <li><a href="#">Home</a></li>
            <li><a href="#">Upload</a></li>
            <li><a href="#">Charts</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
            <AccountsUIWrapper />
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.PropTypes = {

}