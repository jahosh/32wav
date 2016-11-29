import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser(function(user) {
  
  if (user.username && user.username.length < 3) {
    throw new Meteor.Error(403, "Username must have at least 3 characters")
  }
  return user;

})