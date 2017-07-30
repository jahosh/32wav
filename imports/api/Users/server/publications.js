import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

if (Meteor.isServer) {
  Meteor.publish('users.accountInfo', function userPublication(){
    return Meteor.users.find({ _id: this.userId },
      { fields: { profile_img: 1, bio: 1, paypal: 1, slug: 1, location: 1, socials: 1 } });
  }); 
}