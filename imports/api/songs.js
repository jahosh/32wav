"use strict"
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {

  Meteor.publish('songs', function songsPublication() {
    return Songs.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'songs.insert'(title, fileSource) {
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

 

    Songs.insert({ 
      title,
      fileSource,
      createdAt: timeStamp,
      owner: Meteor.userId(),
      username: userName,
      likedBy: [],
      //stream: mp3Link, 
    });
  },
  'songs.remove'(songId) {
    check(songId, String);
    const song = Songs.findOne(songId);

    if (song.private && song.owner !== this.userId || song.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Songs.remove(songId);
  },
  'songs.setChecked'(songId, setChecked) {
    check(songId, String);
    check(setChecked, Boolean);
    const song = Songs.findOne(songId);

    // if the song does not belong to user, cannot cross off..
    if (song.private && song.owner !== this.userId || song.owner !== this.userId) {
      throw new Meteor.Error('not-authrized');
    }

    Songs.update(songId, { $set: { checked: setChecked } });
  },
  'songs.setPrivate'(songId, setToPrivate) {
    check(songId, String);
    check(setToPrivate, Boolean);

    const song = Songs.findOne(songId);

    if (song.owner !== this.userId) {
      throw new Meteor.Error('not your song to make private');
    }

    Songs.update(songId, { $set: { private: setToPrivate } });

   
  },
  'songs.like'(songId) {
    check(songId, String);
  
    //add user to likedBy array
    Songs.update(songId, { $push: { likedBy : this.userId } });
  },
  'songs.getLikesCount'(songId) {
    check(songId, String);

    
  }
});