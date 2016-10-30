import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Accounts.config({
  forbidClientAccountCreation: false
});