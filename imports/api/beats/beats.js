"use strict"
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

export const Beats = new Mongo.Collection('beats');

if (Meteor.isServer) {

  Meteor.publish('beats', function beatsPublication() {
    return Beats.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'beats.insert'(title, fileSource) {
    let timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const userName = Meteor.user().username != null ? Meteor.user().username : Meteor.user().profile.name
    check(title, String);
    check(fileSource, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    console.log(Meteor.user());

    if (!Meteor.user().username) {
      const userName = 'no UserName';
  
    }

    Beats.insert({ 
      title,
      fileSource,
      createdAt: timeStamp,
      owner: Meteor.userId(),
      username: userName,
      likedBy: [],
      plays: 0
      //stream: mp3Link, 
    });
  },
  'beats.remove'(songId) {
    check(songId, String);
    const song = Beats.findOne(songId);

    if (song.private && song.owner !== this.userId || song.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Beats.remove(songId);
  },
  'beats.setChecked'(songId, setChecked) {
    check(songId, String);
    check(setChecked, Boolean);
    const song = Beats.findOne(songId);

    // if the song does not belong to user, cannot cross off..
    if (song.private && song.owner !== this.userId || song.owner !== this.userId) {
      throw new Meteor.Error('not-authrized');
    }

    Beats.update(songId, { $set: { checked: setChecked } });
  },
  'beats.setPrivate'(songId, setToPrivate) {
    check(songId, String);
    check(setToPrivate, Boolean);

    const song = Beats.findOne(songId);

    if (song.owner !== this.userId) {
      throw new Meteor.Error('not your song to make private');
    }

    Beats.update(songId, { $set: { private: setToPrivate } });
   
  },
  'beats.like'(songId) {
    check(songId, String);
 
    //add user to likedBy array
    Beats.update(songId, { $push: { likedBy : this.userId } });
  },
  'beats.getLikesCount'(songId) {
    check(songId, String);  
  },
  'beats.incrementPlayCount'(songId) {
    check(songId, String);

    Beats.update(songId, { $inc: { plays: 1 } });
  }
});