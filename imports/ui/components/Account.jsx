import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';


import { updateBio } from '../../api/users/methods.js';


export default class Account extends Component {
  componentDidMount() {
     $(document).ready(function(){
      $('.collapsible').collapsible();
      $("#editProfile").hide();
      $('input#bio').characterCounter();
  });
  }
  editProfile() {
    console.log('edit');
    $("#editProfile").toggle("slow");
  }
  onFormSubmit(e) {
    e.preventDefault();
    let payload = {};

   const text = $("#bio").val();

   payload.bio = text;
   updateBio.call(payload, (err) => {
     if (err) {
       console.log(err);
        Bert.alert({
          type: 'profile-updated',
          style: 'growl-top-right',
          message: err.error,
          icon: 'fa-user'
        });
        return;
     }
     Bert.alert({
      type: 'profile-updated',
      style: 'growl-top-right',
      title: 'Profile Updated',
      message: '',
      icon: 'fa-user'
    });
   });
  }
  render() {
    return (
      <div className="row">
        <div className="col l10 offset-l1">
          <div className="collection ">
            <Link to={'/' + this.props.user[0].username} className="collection-item">My Profile</Link>
            <Link onClick={this.editProfile} className="collection-item"><span className="badge">1</span>Edit My Profile</Link>            
            <a href="#!" className="collection-item"><span className="new badge">4</span>Send Links</a>
            <a href="#!" className="collection-item">Purchases</a>
            <a href="#!" className="collection-item"><span className="badge">14</span>Reset Password</a>
          </div>
        </div>
        <div className="col m8 s8 l8 offset-l2" id="editProfile">
          <div className="row">
            <form className="col s12" onSubmit={this.onFormSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input defaultValue={this.props.user[0].bio} id="bio" type="text" maxLength="30" className="validate" />
                  <label className="active" htmlFor="first_name2">Bio</label>
                </div>
              </div>
            </form>
          </div>
          <p>Name</p>
        </div>
      </div>  
    );
  }
}