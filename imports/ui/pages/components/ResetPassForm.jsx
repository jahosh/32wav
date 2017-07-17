import React, { Component } from 'react';
import validate from '../../../modules/validate.js';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from 'react-router';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    const component = this;
    validate(component.form, {
      rules: {
        newPassword: {
          required: true,
          minlength: 6,
        },
        repeatNewPassword: {
          required: true,
          minlength: 6,
          equalTo: '[name="newPassword"]',
        },
      },
      messages: {
        newPassword: {
          required: 'Enter a new password, please.',
          minlength: 'Use at least six characters, please.',
        },
        repeatNewPassword: {
          required: 'Repeat your new password, please.',
          equalTo: 'Hmm, your passwords don\'t match. Try again?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {

    const { token } = this.props;

    Accounts.resetPassword(token, this.newPassword.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        browserHistory.push('/');
      }
    });
}
  render() {
    return (
      <div>
        <form ref={ form => (this.form = form)} onSubmit={event => event.preventDefault() } className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="password" 
                type="password" 
                ref={newPassword => (this.newPassword = newPassword) } 
                name="newPassword"
               />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input 
                type="password" 
                ref={repeatNewPassword => (this.repeatNewPassword = repeatNewPassword)}
                id="password-again" 
                name="repeatNewPassword" 
              />
            </div>
          </div>
          <div className="centerButton">
            <button id="reset-pwd" className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPasswordForm;