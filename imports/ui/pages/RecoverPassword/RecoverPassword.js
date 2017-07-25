import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

import validate from '../../../modules/validate';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const email = this.emailAddress.value;

    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(`Check ${email} for a reset link!`, 'success');
        // history.push('/login');
      }
    });
  }

  render() {
    return (
      <div className="RecoverPassword">
        <span className="center-align">
          <h4 className="page-header">Recover Password</h4>
          <p>Enter your email address below to recieve a link to reset your password.</p>
        </span>

        <div className="col s12 m6 l10 offet-m3 offset-l1">
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <div className="input-field col s12">
              <input
                type="email"
                name="emailAddress"
                ref={emailAddress => (this.emailAddress = emailAddress)} 
              />
              <label className="active" htmlFor="email">Email Address:</label>
            </div>
            <div className="center-align">
              <button className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RecoverPassword;