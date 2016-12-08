import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Accounts.validateNewUser((user) => {
   
  if (user.username && user.username.length < 3) {
    throw new Meteor.Error(403, "Username must have at least 3 characters")
  }

  return true;
})