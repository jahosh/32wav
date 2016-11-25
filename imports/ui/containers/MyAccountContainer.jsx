import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Account from '../components/Account.jsx';
import Blaze from 'meteor/gadicc:blaze-react-component';

class AccountContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        { this.props.loading ? <Blaze template="spinner" /> : 
        <div>
          <Account
            user={this.props.user} 
          />  
      </div>
        }
    </div>
    );
  }
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('users.accountInfo');
  const user = Meteor.users.find({_id: Meteor.userId() }).fetch()
  const loading = !subscription.ready();
  return {
    loading: loading,
    user: user,
  }
}, AccountContainer);
