import { moment } from 'meteor/momentjs:moment';


Accounts.onCreateUser((options, user) => {

  let timeStamp = moment().format('MMMM Do YYYY');
  user.createdAt = timeStamp

  if (user.services.twitter) {
    const { profile_image_url, screenName } = user.services.twitter;
    //grab photo link from twitter
    user.profile_img = profile_image_url.replace(/(_normal)/i, '');
    user.username = screenName;
    user.emails = [
      {
        "address": "test1234@test.com",
        "verified": false
      },
    ]
  }

  if (!user.services.twitter) {
    user.profile_img = "./defaultAvatar.jpg";
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