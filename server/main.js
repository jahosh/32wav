//Server Methods
import '../imports/api/tracks/methods.js';
import '../imports/api/users/methods.js';

//Server Publications
import '../imports/api/tracks/server/publications.js';
import '../imports/api/users/server/publications.js';

import { Accounts } from 'meteor/accounts-base';
import '../imports/startup/server/mail-url.js';
import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';

//User Account Validation Modules
import './accounts/validateUser.js';
import './accounts/createUser.js';

Accounts.onLogin(function(){ 
  const userId = Meteor.userId();
  Roles.addUsersToRoles( userId, ['user'] );
});


