import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base'
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';
import validate from '../../modules/validate.js';

import ResetPasswordForm from './components/ResetPassForm';

export const ResetPassword = (props) => {
    return (
      <div className="row">
        <div className="col s12">
          <h3 className="center-align">Reset Password</h3>
          <div className="col s6 offset-s3">
            <ResetPasswordForm
              token={props.params.token} />
          </div>
        </div>
      </div>
    );
  }
