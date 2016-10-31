import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export const SignIn = () => (
  <div className="row">
  <div className="col s12 l8 offset-l2" id="loginForm">
    <h3 className="center-align">Sign In</h3>
    <Blaze template="atForm"  />
    <Blaze template="atNavButton" />
  </div>
  </div>
);