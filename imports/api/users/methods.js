import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import editProfile from './edit-profile';


Meteor.methods({
  'users.editProfile': function usersEditProfile(profile) {
    check(profile, {
      bio: Match.Optional(String),
      twitter: Match.Optional(String),
      paypal: Match.Optional(String),
      location: Match.Optional(String)
    });

  return editProfile({ userId: this.userId, profile})
    .then(response => response)
    .catch((e) => {
      throw new Meteor.Error('500', e);
    });
  },
  'users.updateProfileImage': function usersUpdateAvatar(source) {
    check( source, String);

    try {
      Meteor.users.update(Meteor.userId(), { $set: { profile_img: source }});
    } catch(e) {
      throw new Meteor.Error('500', e);
    }
  }
});

// /*
//  *        Updates a users profile image
//  * 
//  * @param {string} source - s3 link to user's photo
//  * 
//  */
// export const updateProfileImage = new ValidatedMethod({
//   name: "Users.methods.updateProfileImage",
//   validate: new SimpleSchema({
//     source: { type: String },
//   }).validator(),
//   run( { source } ) {
//     const userId = Meteor.userId();

//     Meteor.users.update(userId, { $set: { profile_img: source } });
//   }
// });

// /*
//  *        Updates a users bio
//  * 
//  * @param {string} bio - user's bio/tag-line
//  * @param {string} twitter - user's twitter name
//  * @param {string} paypal - user's paypal address
//  * 
//  */
// export const updateBio = new ValidatedMethod({
//   name: "Users.methods.updateBio",
//   validate: new SimpleSchema({
//     bio: { type: String },
//     twitter: { type: String },
//     paypal: { type: String },
//     location: { type: String }
//   }).validator(),
//   run( { bio, twitter, paypal, location } ) {
//     const userId = Meteor.userId()
//     user = Meteor.users.findOne(userId);
//     Meteor.users.update(user._id, { $set: { bio: bio, twitter: twitter, paypal: paypal, location: location } });
//   }
// });


