import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateBio = new ValidatedMethod({
  name: "Users.methods.updateBio",
  validate: new SimpleSchema({
    bio: { type: String },
  }).validator(),
  run( { bio } ) {
    const userId = Meteor.userId()
    user = Meteor.users.findOne(userId);
    if (user.bio === bio) {
      throw new Meteor.Error('no changes to save');
    }
    Meteor.users.update(user, { $set: {bio: bio } });
  }
});