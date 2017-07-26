import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { browserHistory } from 'react-router';

const handleLogin = (service, callback, onLoading) => {
  if (Meteor.user()) {
    return alert('Already logged in');
    return;
  }
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
  }[service](options, (error) => {
    onLoading();
      Meteor.setTimeout(() => {
        if (error) {
          if (error.message === "No matching login attempt found") {
            onLoading();
            return;
          }
          Bert.alert(error.message, 'danger');
          onLoading();
          return;
        }
        Meteor.setTimeout(() => {
          browserHistory.push('/myaccount');
        }, 200);
      }, 100);
    });
};

const serviceLabel = {
  facebook: <span><Icon icon="facebook-official" /> Log In with Facebook</span>,
  google: <span><Icon icon="google" /> Log In with Google</span>,
};


const OAuthLoginButton = ({ service, callback, onLoading }) => (
  <a 
    className={`waves-effect waves-light btn social ${service}`} 
    onClick={ () =>{ 
      handleLogin(service, callback, onLoading);
    }}
  >
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
      Bert.alert(error.message, 'danger');
      return;
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