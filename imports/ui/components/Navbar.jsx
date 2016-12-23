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
      <nav className="grey darken-4 topNav">
        <div className="nav-wrapper">  
          <ul className="right">
            <li><Link to="/myaccount" activeClassName="active">{ this.props.currentUser ? <div className="user-email"> {this.props.currentUser.username } </div> : '' }</Link></li>
          </ul>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/browse" activeClassName="active">Browse</Link></li>
            <li><Link to="/upload" activeClassName="active">Upload</Link></li>
            <li><Link to="/myaccount" activeClassName="active">Account</Link></li>
            <li><Link to="/faq" activeClassName="active">FAQ</Link></li>
            <li><Link to="/contact" activeClassName="active">Contact</Link></li>
            <li><Link to="/signin" activeClassName="active">Login</Link></li>

          </ul>
          <ul className="side-nav links" id="mobile-demo">
            <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
            <li><Link to="/browse" activeClassName="active">Browse</Link></li>
            <li><Link to="/upload" activeClassName="active">Upload</Link></li>
            <li><Link to="/myaccount" activeClassName="active">Account</Link></li>
            <li><Link to="/faq" activeClassName="active">FAQ</Link></li>
            <li><Link to="/contact" activeClassName="active">Contact</Link></li>
            <li><Link to="/signin" activeClassName="active">Login/Register</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.PropTypes = {

}
