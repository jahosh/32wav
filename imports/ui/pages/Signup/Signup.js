import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import { browserHistory } from 'react-router';

import OAuthLoginButtons from '../components/OAuthLoginButtons/OAuthLoginButtons';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        username: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
        repeatPassword: {
          required: true,
          equalTo: "#password-input"
        }
      },
      messages: {
        username: {
          required: 'Please enter a unique username',
        },
        emailAddress: {
          required: 'Required.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Required.',
          minlength: 'Please use at least six characters.',
        },
        repeatPassword: {
          required: 'Need a password here.',
          equalTo: 'Passwords must match.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {

    Accounts.createUser({
      email: this.email.value,
      password: this.password.value,
      username: this.username.value,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome!', 'success');
        browserHistory.push('/myaccount');
      }
    });
  }

  handleLogout() {
    this.toggleLoading();
    Meteor.logout((error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('successfully logged out', 'success');
        this.toggleLoading();
      }
    });
  }

  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  }

  render() {
    return (
      <div className="Signup">
        <span className="center-align">
          <h2>Signup</h2>
        </span>
        <div className="row">
            <div className="col s12 m6 l10 offset-m3 offset-l1">
              <div className="LoginBorder">

                <OAuthLoginButtons
                  onLoading={this.toggleLoading}
                  services={['facebook', 'google']}
                  emailMessage={{
                    text: 'Log In with an OAuth provider',
                  }}
                />

                <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                  <div className="input-field col s12">
                    <input
                      id="username-input"
                      type="text"
                      name="username"
                      ref={username => (this.username = username)}
                    />
                    <label className="active" htmlFor="username">Username:</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      ref={email => (this.email = email)}
                    />
                    <label className="active" htmlFor="email">Email:</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="password-input"
                      type="password"
                      name="password"
                      ref={password => (this.password = password)}
                    />
                    <i>Use at least six characters.</i>
                    <label className="active" htmlFor="password">Password:</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="repeatpassword-input"
                      type="password"
                      name="repeatpassword"
                      ref={repeatPassword => (this.repeatPassword = repeatPassword)}
                    />
                    <label className="active" htmlFor="repeatpassword">Repeat Password:</label>
                  </div>
                  <div className="center-align">
                    {Meteor.user() === null ?
                        <button className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Signup
                      <i className="material-icons right">send</i>
                        </button>
                        :
                        <button
                          className="btn waves-effect waves-light grey darken-4 center-align"
                          name="action"
                          onClick={this.handleLogout}>
                          Logout
                          <i className="material-icons right">send</i>
                        </button>
                      }
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}


export default Signup;