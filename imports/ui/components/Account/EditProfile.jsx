import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export const EditProfile = (props) => {
  return (
   <div className="col m8 s8 l8 offset-l2" id="editProfile">
        <div className="row">
           { props.uploading ?<div className="col l12"> <Blaze className="pic-load" template="spinner" /> </div>:
            <div className="center-align">
              <span className="user-avatar" style={{"background": 'url(' + props.pic + ')', "margin": "0 auto"}}></span>
              <p className="flow-text">current profile picture</p>
              <p className="flow-text" id="user-tagline">{props.user[0].bio}</p>
            </div>
           }
            <div className="progress-status">
              <p className="flow-text center-align">Progress: {props.progress.width}</p>
            </div>
            <div className="progress">
              <div className="determinate" style={props.progress}></div>
            </div>
          </div>

          <div className="row">
            <form className="col s12" onSubmit={props.handleFormSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input defaultValue={props.user[0].bio} id="bio" type="text" maxLength="30" className="validate" />
                  <label className="active" htmlFor="first_name2">Bio</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={props.handleFormSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input defaultValue={props.user[0].twitter} id="twitter-name" type="text" maxLength="30" className="validate" />
                  <label className="active" htmlFor="first_name2">Twitter:</label>
                </div>
              </div>
            </form>
          </div>
             <div className="row">
            <form className="col s12" onSubmit={props.handleFormSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input defaultValue={props.user[0].paypal} id="paypal-name" type="text" maxLength="30" className="validate" />
                  <label className="active" htmlFor="first_name2">Paypal:</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <form onChange={props.handleAvatarUpload}>
              <div className="file-field input-field">
                <div className="btn">
                  <span>Profile Picture</span>
                  <input type="file" id="profile-pic-upload" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </form>
          </div>
        </div>
  );
}


 