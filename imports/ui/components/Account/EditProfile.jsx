import React from 'react';

export const EditProfile = (props) => {
  return (
   <div className="col m8 s8 l8 offset-l2" id="editProfile">
        <div className="row">
            <div className="center-align">
              <img className="userPic" src={props.user[0].profile_img} />
              <p className="flow-text">current profile picture</p>
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
            <div className="progress-status">
              <p className="flow-text center-align">Progress: {props.progress.width}</p>
            </div>
             <div className="progress">
            <div className="determinate" style={props.progress}></div>
          </div>
          </div>
        </div>
  );
}


 