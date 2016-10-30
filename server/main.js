//Server Methods
import '../imports/api/beats/beats.js';
import '../imports/api/beats/mp3s.js';

import { Accounts } from 'meteor/accounts-base';
import '../imports/startup/server/mail-url.js';
import { Email } from 'meteor/email';



Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  if (options.profile) {
    user.profile = options.profile

  } else {
    user.profile = { name: 'test' }
  }
  //user.profile = options.profile ? options.profile : {};
  Email.send({
  to: 'josh91hickman@gmail.com',
  from: 'mistahhick@gmail.com',
  subject: "Example Email",
  html: "</strong> Welcome Jahosh to 32.wav</strong> normal?</strong><i>Italic</i>",
});
  return user
});

