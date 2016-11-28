import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';


//methods
import { updateBio } from '../../api/users/methods.js';
import { updateProfileImage } from '../../api/users/methods.js';

//components
import { EditProfile } from './Account/EditProfile.jsx';

export default class Account extends Component {
  constructor(props){
    super(props);
    this.state = {
      progress: 0
    }
  }
  componentDidMount() {
    this.hideUploadElements();
    $('.collapsible').collapsible();
    $("#editProfile").hide();
  }
  hideUploadElements() {
    $(".progress").hide();
    $(".progress-status").hide();
    $(".progress-result-success").hide();
  }
  displayUploadElements() {
    $(".progress").fadeIn();
    $(".progress-status").fadeIn();
  }
  editProfile() {
    $("#editProfile").toggle("slow");
  }
  onAvatarUpload(e) {
    e.preventDefault();
    const self = this;
    self.displayUploadElements();
    const file = $("#profile-pic-upload")[0].files[0];
    const upload = new Slingshot.Upload("avatarToAmazonS3");

    upload.send(file, function(err, source) {
      computation.stop();
      if (err) {
        self.setState({ progress: 0 });
        console.error(err);
        alert(err);
        return;
      }
     let profileImage = {
       source: source
     };

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
      });
    });
   let computation = Tracker.autorun(() => {
    if (!isNaN(upload.progress())) {
      self.setState({ progress: upload.progress() * 100 });
      console.log(self.state);
    }
    }); 
  }
  onEditProfile(e) {
    e.preventDefault();
   let payload         = {},
       bio             = $("#bio").val(),
       twitter         = $("#twitter-name").val(),
       paypal          = $("#paypal-name").val();

    let bioDefault     = $("#bio").prop("defaultValue"),
        twitterDefault = $("#twitter-name").prop("defaultValue"),
        paypalDefault  = $("#paypal-name").prop("defaultValue");

    if (bio === bioDefault && twitter === twitterDefault && paypal === paypalDefault) {
        alert('no change');
        return;
    }   
    payload.bio = bio;
    payload.twitter = twitter;
    payload.paypal = paypal;

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
    const src = this.props.user[0].profile_img;
    const reSized = src.replace('https://jahosh-meteor-files.s3-us-west-2', 'https://jahosh-meteor-files-resized.s3-us-west-1');
    return (
      <div className="row">
        <div className="col l10 offset-l1">
          <div className="collection" id="account-links">
            <Link to={'/' + this.props.user[0].username} className="collection-item">My Profile</Link>
            <Link onClick={this.editProfile} className="collection-item">Edit My Profile</Link>   
            <Link className="collection-item">Subscription</Link>         
            <Link to="/send" className="collection-item">Send Links</Link>
            <a href="#!" className="collection-item">Purchases</a>
            <a href="#!" className="collection-item">Reset Password</a>
          </div>
          <EditProfile
            user={this.props.user}
            pic={reSized}
            progress={uploadStyle}
            handleFormSubmit={this.onEditProfile.bind(this)}
            handleAvatarUpload={this.onAvatarUpload.bind(this)}
          />
        </div>
      </div>  
    );
  }
}