import { moment } from 'meteor/momentjs:moment';


Accounts.onCreateUser((options, user) => {
  let timeStamp = moment().format('MMMM Do YYYY');
  user.createdAt = timeStamp
  user.verified  = false;

  if (!user.services.twitter) {
    user.profile_img = "./defaultAvatar.jpeg";
  }

  Meteor.call('sendVerificationLink', user, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('sent');
    }
  });
  
  return user;
});