import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Account from '../components/Account/Account.jsx';
import Blaze from 'meteor/gadicc:blaze-react-component';

/* Responsible for Fetching Data Related to "Account" View */
class AccountContainer extends Component {
  componentDidMount() {
    document.title = "Account | 32wav ";
  }
  render() {
    return (
      <div className="row">
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


   //  <div className="col s12 m12 l10 offset-l1">
      //     <header className="background-header text-center" id="account-header">
      //       <h1 className="center">Account</h1>
      //     </header>
      //   </div>