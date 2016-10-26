//Server Methods
import '../imports/api/beats/beats.js';
import '../imports/api/beats/mp3s.js';

import { Accounts } from 'meteor/accounts-base';



Accounts.onCreateUser(function(options, user) {
  // We're enforcing at least an empty profile object to avoid needing to check
  // for its existence later.
  if (options.profile) {
    user.profile = options.profile

  } else {
    user.profile = { name: 'test' }
  }
  //user.profile = options.profile ? options.profile : {};

  return user
});