import { Meteor } from 'meteor/meteor';
import { Tracks } from './tracks.js';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { moment } from 'meteor/momentjs:moment';

/*
 * Adds a Track to the database, (string info only)
 * @param {string} title - the title of the track
 * 
 */
export const insertTrack = new ValidatedMethod({
  name: 'Tracks.methods.insert',
  validate: new SimpleSchema({
    title: { type: String },
    fileSource: { type: String },
  }).validator(),
  run(beat) {
    let timeStamp = moment().format('X');

    const userName = Meteor.user().username != null ? Meteor.user().username : Meteor.user().profile.name
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Tracks.insert({ 
      title: beat.title,
      fileSource: beat.fileSource,
      createdAt: timeStamp,
      owner: Meteor.userId(),
      username: userName,
      likedBy: [],
      plays: 0
    });
  },
});

