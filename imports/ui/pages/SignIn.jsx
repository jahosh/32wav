import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export const SignIn = () => (
  <div className="row">
  <div className="col s12 l8 offset-l2" id="loginForm">
    <Blaze template="atForm"  /> 
    <div className="center-align">
      <Blaze template="atNavButton" />
    </div>
  </div>
  </div>
);