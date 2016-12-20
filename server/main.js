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

  let userId = Meteor.userId();

  Roles.addUsersToRoles( userId, ['user'] );
  });


/*
Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  if (options.profile) {
    user.profile = options.profile

  } else {
    user.profile = { name: 'test' }
  }

  */
  //user.profile = options.profile ? options.profile : {};
  /*
   * Send E-mail to Newly Created User
   * 
   */
  /* Disabled for now...
  Email.send({
  to: 'josh91hickman@gmail.com',
  from: 'mistahhick@gmail.com',
  subject: "Example Email",
  html: "</strong> Welcome Jahosh to 32.wav</strong> normal?</strong><i>Italic</i>",
  });
  
  Meteor.call('sendVerificationLink', (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log('sent');
    }
  })
  return user
*/


/*

});

*/


