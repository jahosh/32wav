import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';



if (Meteor.isServer) {
  Meteor.publish('users.accountInfo', function userPublication(username){
    return Meteor.users.find({ _id: this.userId },
      { fields: { profile_img: 1, bio: 1, twitter: 1 } });
  }); 
}