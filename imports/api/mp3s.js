import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Mp3s = new Mongo.Collection('mp3Details');

if (Meteor.isServer) {

  Meteor.publish('mp3Details', function mp3Publication() {
    return Mp3s.find({});
  });
}

Meteor.methods({
  'mp3s.insert'(url, timeStamp, currentUser){
    check(url, String);
    check(timeStamp, Number);

    Mp3s.insert({
      mp3: url,
      time: timeStamp,
      uploadedBy: this.userId
    })
    console.log('done');
  },
})