import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';

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
    $(".progress").hide();
    $("#processing-flag").hide();
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
        self.setState({ progress: 0, uploading: true });
        console.error(err);
        alert(err);
        return;
      }
     let profileImage = {
       source: source
     };
    
      Meteor.call('users.updateProfileImage', source, (err) => {
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
        $("#processing-flag").fadeIn("slow");
        Meteor.setTimeout(function(){ self.setState({ uploading: false, processing: false }); self.hideUploadElements();   }, 4000);
      });
    });
    let computation = Tracker.autorun(() => {
      if (!isNaN(upload.progress())) {
        self.setState({ progress: upload.progress() * 100, uploading: true });
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

   Meteor.call('users.editProfile', payload, (err) => {
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
    const source = testSrc(src);
    return (
      <div className="row">
        <div className="col l10 offset-l1 s10 offset-s1 account-main-div">
          <div className="center-align">
            <span className="account-username center-align">{ this.props.user[0].username }</span>
          </div>
          <div className="col s12 l12">
            <div className="center-align">

              {this.state.processing ? <div className="center-align"> <h4 id="processing-flag"> Processing File</h4><Blaze className="pic-load" template="spinner" /> </div> : '' }
              { this.state.uploading ? <div className="col l12"> <Blaze className="pic-load" template="spinner" /> </div> :
                <div>
                  <span className="user-avatar" style={{ "background": 'url(' + source + ')', "margin": "0 auto" }}></span>
                  <p className="flow-text" id="user-tagline">{this.props.user[0].bio}</p>
                </div>
              }

              <div className="progress-status">
                <p className="flow-text center-align">Progress: {uploadStyle.width}</p>
              </div>
              <div className="progress">
                <div className="determinate" style={uploadStyle}></div>
              </div>
      
              <div className="button-aligner">
                <Link to={'/' + this.props.user[0].slug} className="waves-effect waves-light btn-large grey darken-4 margin-bottom-5">My Profile</Link>
                <Link onClick={this.editProfile} className="waves-effect waves-light btn-large grey darken-4 margin-bottom-5">Edit My Profile</Link>
                <Link to={'/alluploads/' + this.props.user[0].username} className="waves-effect waves-light btn-large grey darken-4 margin-bottom-5">Edit Instrumentals</Link>         
              </div>
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
      </div>  
    );
  }
}

// <a href="#!" className="collection-item">Reset Password</a>


{/* <div className="col l6">
  <div className="center-align">
    <span className="user-avatar" style={{ "background": 'url(' + source + ')', "margin": "0 auto" }}></span>
    <p className="margin-5px" id="currentPhoto">current profile picture</p>
    <p className="flow-text" id="user-tagline">{this.props.user[0].bio}</p>
  </div>
</div> */}


