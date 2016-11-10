"use strict"
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';


export const Tracks = new Mongo.Collection('Tracks');

if (Meteor.isServer) {

  Meteor.publish('Tracks', function tracksPublication() {
    return Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
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