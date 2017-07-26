import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../modules/validate';
import Blaze from 'meteor/gadicc:blaze-react-component';

import OAuthLoginButtons from './components/OAuthLoginButtons/OAuthLoginButtons.js';

class Login extends React.Component {
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
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Required',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Required',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    Meteor.loginWithPassword(this.emailAddress.value, this.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        // Bert.alert('Welcome back!', 'success');
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
      <div className="Login">
        <span className="center-align">
          { Meteor.user}
          <h2>Login</h2>
        </span>
        <div className="row">
          <div className="col s12 m6 l10 offset-m3 offset-l1">
            <div className="LoginBorder">
            { this.state.loading ? <Blaze template="spinner" /> : ''}
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
                      id="email-input" 
                      type="email"
                      name="emailAddress"
                      ref={emailAddress => (this.emailAddress = emailAddress)}
                    />
                    <label className="active" htmlFor="first_name2">Email Address:</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      id="password-input" 
                      type="password"
                      name="password"
                      ref={password => (this.password = password)}
                    />
                    <Link className="" to="/signup">New user? Signup</Link>
                    <br />
                    <Link className="pull-left" to="/recover-password">Forgot password?</Link>
                    <label className="active" htmlFor="first_name2">Password:</label>
                  </div>
                  <div className="center-align">
                  { Meteor.user() === null ? 
                    <button className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Login
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


export default Login;