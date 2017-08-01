import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';


export const EditProfile = (props) => {
  return (
    <div className="col m12 s12 l12 edit-account-main-div" id="editProfile">

      <div className="row edit-profile-form-row">
        <form className="col s12" onSubmit={props.handleFormSubmit}>
          <div className="row edit-profile-form-row">
            <div className="input-field col s12">
              <input defaultValue={props.user[0].bio} id="bio" type="text" maxLength="30" className="validate" />
              <label className="active" htmlFor="first_name2">Bio</label>
            </div>
          </div>
        </form>
      </div>

      <div className="row edit-profile-form-row">
        <form className="col s12" onSubmit={props.handleFormSubmit}>
          <div className="row edit-profile-form-row">
            <div className="input-field col s12">
              <input defaultValue={props.user[0].location} id="location" type="text" maxLength="30" className="validate" />
              <label className="active" htmlFor="first_name2">Location:</label>
            </div>
          </div>
        </form>
      </div>

        <div className="row edit-profile-form-row">
          <form className="col s12" onSubmit={props.handleFormSubmit}>
            <div className="row edit-profile-form-row">
              <div className="input-field col s12">
                <input defaultValue={props.user[0].paypal} id="paypal-name" type="text" maxLength="30" className="validate" />
                <label className="active" htmlFor="first_name2">Paypal:</label>
              </div>
            </div>
          </form>
        </div>

          <div className="row edit-profile-form-row hide-on-small-only">
            <form id="upload-form" onChange={props.handleAvatarUpload}>
              <div className="file-field input-field">
                <div className="btn">
                  <span>Profile Picture</span>
                  <input type="file" className="grey darken-4" id="profile-pic-upload" />
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


 
        // <form className="col s12" onSubmit={props.handleFormSubmit}>
        //   <div className="row">
        //     <div className="input-field col s12">
        //       <input defaultValue={props.user[0].socials.twitter} id="twitter-name" type="text" maxLength="30" className="validate" />
        //       <label className="active" htmlFor="first_name2">Twitter:</label>
        //     </div>
        //   </div>
        // </form>


        // not needed submit button
{/* <div className="center-align">
  <button className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
  </button>
</div> */}