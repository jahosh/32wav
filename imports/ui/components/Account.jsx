import React, { Component, PropTypes } from 'react';



export default class Account extends Component {
  componentDidMount() {
     $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  }
  render() {
    return (
      <div className="row">
      <div className="col l4 offset-l1">
        <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header"><i className="material-icons">filter_drama</i>Edit Profile</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">place</i>My Tracks</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        <li>
          <div className="collapsible-header"><i className="material-icons">whatshot</i>Stats</div>
          <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
        </li>
        </ul>
        </div>
      </div>  
    );
  }
}