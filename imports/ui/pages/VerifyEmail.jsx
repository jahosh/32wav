import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base'
import { Bert } from 'meteor/themeteorchef:bert';

/*
export const VerifyEmail = (props) => (
  <div>
  { console.log(props) }
    <h3 className="center-align">Verify Email</h3>
    <p className="flow-text center-align">Coming Soon...</p>
  </div>
)

*/



export class VerifyEmail extends Component {
  componentDidMount() {
    console.log(this.props);
    Accounts.verifyEmail( this.props.params.token, (err) => {
      if (err) {
        Bert.alert(err.reason, 'danger');
      } else {
        Bert.alert('Email verified, Thank-you', 'successs');
      }
    });
  }
  render() {
    return (
      <div>
        <h3 className="center-align">Verify Email</h3>
        <p className="flow-text center-align">Coming Soon...</p>
      </div>
    );
  }
}
