import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

//methods
import { updateBio } from '../../../api/users/methods.js';
import { updateProfileImage } from '../../../api/users/methods.js';

//components
import { EditProfile } from './EditProfile.jsx';

export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 0,
      uploading: false,
      processing: false
    }
  }
  componentDidMount() {
    this.hideUploadElements();
    $('.collapsible').collapsible();
    $("#editProfile").hide();
  }
  hideUploadElements() {
    $(".progress").hide("slow");
    $(".progress-status").hide();
    $(".progress-result-success").hide();
  }
  displayUploadElements() {
    $(".progress").fadeIn("slow");
    $(".progress-status").fadeIn("slow");
  }
  editProfile() {
    $("#editProfile").toggle("slow");
    $('html, body').animate({
    scrollTop: $("#bio").offset().top
}, 1000);
  }
  onAvatarUpload(e) {
    e.preventDefault();
    const self = this;
    const file = $("#profile-pic-upload")[0].files[0];
    const upload = new Slingshot.Upload("avatarToAmazonS3");
    self.displayUploadElements();

    upload.send(file, function(err, source) {
      computation.stop();
      if (err) {
        self.setState({ progress: 0, uploading: false });
        console.error(err);
        alert(err);
        return;
      }
     let profileImage = {
       source: source
     };
     //Meteor.setTimeout(function(){ self.setState({ uploading: false });    }, 4000);
     
     console.log(self.state);
      updateProfileImage.call(profileImage, (err) => {
        if (err) {
          console.log(err);
        }
        Bert.alert({
          type: 'profile-updated',
          style: 'growl-top-right',
          title: 'profile image updated',
          message: '',
          icon: 'fa-user'
        });
        self.setState({ processing: true });
        Meteor.setTimeout(function(){ self.setState({ uploading: false, processing: false }); self.hideUploadElements();   }, 10000);
      });
    });
    let computation = Tracker.autorun(() => {
      if (!isNaN(upload.progress())) {
        self.setState({ progress: upload.progress() * 100, uploading: true });
        console.log(self.state);
      }
    }); 
  }
  onEditProfile(e) {
    e.preventDefault();
   let payload         = {},
       bio             = $("#bio").val(),
       twitter         = $("#twitter-name").val(),
       paypal          = $("#paypal-name").val(),
       location        = $("#location").val();

    let bioDefault      = $("#bio").prop("defaultValue"),
        twitterDefault  = $("#twitter-name").prop("defaultValue"),
        paypalDefault   = $("#paypal-name").prop("defaultValue"),
        locationDefault = $("#location").prop("DefaultValue");

    if (bio === bioDefault && twitter === twitterDefault && paypal === paypalDefault && location === locationDefault) {
        alert('no change');
        return;
    }   
    payload.bio = bio;
    payload.twitter = twitter;
    payload.paypal = paypal;
    payload.location = location;

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
    const uploadStyle = {
      width: Math.round(this.state.progress) + '%'
    } 
    const src = this.props.user[0] ? `${this.props.user[0].profile_img}` : 'not here';
    function testSrc(src) {
      if (src === "undefined") {
        return './defaultAvatar.jpeg';
      }
       return src.replace('https://jahosh-meteor-files.s3-us-west-2', 'https://jahosh-meteor-files-resized.s3-us-west-1');
    }
    const source = testSrc(src)
   
    return (
      <div className="row">
        <div className="col l10 offset-l1">
        <div className="center-align">
        <span className="account-username center-align">{ this.props.user[0].username }</span>
        </div>
          <div className="collection" id="account-links">
            <Link to={'/' + this.props.user[0].username} className="collection-item">My Profile</Link>
            <Link onClick={this.editProfile} className="collection-item">Edit My Profile</Link>   
            <Link className="collection-item">Edit Tracks</Link>         
            <a href="#!" className="collection-item">Reset Password</a>
          </div>
          <EditProfile
            user={this.props.user}
            uploading={this.state.uploading}
            processing={this.state.processing}
            pic={source}
            progress={uploadStyle}
            handleFormSubmit={this.onEditProfile.bind(this)}
            handleAvatarUpload={this.onAvatarUpload.bind(this)}
          />
        </div>
      </div>  
    );
  }
}