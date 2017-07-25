import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { browserHistory } from 'react-router';


const handleLogin = (service, callback) => {
  const options = {
    facebook: {
      requestPermissions: ['email'],
      loginStyle: 'popup',
    },
    google: {
      requestPermissions: ['email'],
      loginStyle: 'popup'
    },
  }[service];

  return {
    facebook: Meteor.loginWithFacebook,
    google: Meteor.loginWithGoogle,
    soundcloud: Meteor.loginWithSoundcloud
  }[service](options, callback);
};

const serviceLabel = {
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
};


const OAuthLoginButton = ({ service, callback }) => (
  // <button
  //   // className={`OAuthLoginButton OAuthLoginButton-${service}`}
  //   type="button"
  //   onClick={() => handleLogin(service, callback)}
  // >
  //   {serviceLabel[service]}
  // </button>
  <a className={`waves-effect waves-light btn social ${service}`} onClick={() => handleLogin(service, callback)}>
    <i className={`fa fa-${service}`}></i> {`Sign in with ${service}`} 
  </a>
);

OAuthLoginButton.defaultProps = {
  callback: (error) => {
    // handle unsuccessfully OAuth login
    if (error) { 
      if (error.message === "No matching login attempt found") {
        return;
      }
      console.log(error);
      Bert.alert(error.message, 'danger');
    }

    // handle successfully OAuth login
    browserHistory.push('/myaccount');
  },
}

OAuthLoginButton.propTypes = {
  service: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default OAuthLoginButton;