import React, { Component, PropTypes } from 'react';


//react components
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Navbar extends Component {
  componentDidMount() {
 
  }
  render() {
    console.log(this.props);
    return (
      <div className="navBar">
        <ul id="slide-out" className="side-nav fixed">
          <li><div className="userView">
            <img className="background" />
            <a href="#!user"><img className="circle" src="./assets/josh.JPG" /></a>
            <a href="#!name"><strong><span className="black-text name">Jahosh</span></strong></a>
            <a href="#!email"><span className="black-text email">jahosh@32wav.com</span></a>
          </div></li>
          <li><i className="material-icons">assignment_ind</i><AccountsUIWrapper /></li>
          <li><div className="divider"></div></li>
          <li><a href="/"><i className="material-icons">perm_identity</i>Home</a></li>
          <li><a href="#!"><i className="material-icons">cloud</i>My Uploads</a></li>
          <li><a href="#faq"><i className="material-icons">question_answer</i>FAQ</a></li>
          <li><a href="/contact"><i className="material-icons">email</i>Contact</a></li>
         
        </ul>
        <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>


      /* 
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

  */

    )
  }
}