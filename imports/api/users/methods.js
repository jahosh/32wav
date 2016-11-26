import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateBio = new ValidatedMethod({
  name: "Users.methods.updateBio",
  validate: new SimpleSchema({
    bio: { type: String },
    twitter: { type: String },
  }).validator(),
  run( { bio, twitter } ) {
    const userId = Meteor.userId()
    user = Meteor.users.findOne(userId);

    Meteor.users.update(user, { $set: { bio: bio, twitter: twitter } });
  }
});

export const updateProfileImage = new ValidatedMethod({
  name: "Users.methods.updateProfileImage",
  validate: new SimpleSchema({
    source: { type: String },
  }).validator(),
  run( { source } ) {
    const userId = Meteor.userId()

    Meteor.users.update(userId, { $set: { profile_img: source } });
  }
})