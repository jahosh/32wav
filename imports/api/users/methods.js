import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

/*
 *        Updates a users bio
 * 
 * @param {string} bio - user's bio/tag-line
 * @param {string} twitter - user's twitter name
 * @param {string} paypal - user's paypal address
 * 
 */
export const updateBio = new ValidatedMethod({
  name: "Users.methods.updateBio",
  validate: new SimpleSchema({
    bio: { type: String },
    twitter: { type: String },
    paypal: { type: String },
    location: { type: String }
  }).validator(),
  run( { bio, twitter, paypal, location } ) {
    const userId = Meteor.userId()
    user = Meteor.users.findOne(userId);

    Meteor.users.update(user, { $set: { bio: bio, twitter: twitter, paypal: paypal, location: location } });
  }
});

/*
 *        Updates a users profile image
 * 
 * @param {string} source - s3 link to user's photo
 * 
 */
export const updateProfileImage = new ValidatedMethod({
  name: "Users.methods.updateProfileImage",
  validate: new SimpleSchema({
    source: { type: String },
  }).validator(),
  run( { source } ) {
    const userId = Meteor.userId();

    Meteor.users.update(userId, { $set: { profile_img: source } });
  }
});

