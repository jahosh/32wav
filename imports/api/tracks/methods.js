import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { moment } from 'meteor/momentjs:moment';


//mongo collections
import Tracks from './tracks.js';

/*
 * Adds a Track to the database, (string info only)
 * @param {string} title - the title of the track
 * 
 */
export const insertTrack = new ValidatedMethod({
  name: "Tracks.methods.insert",
  validate: new SimpleSchema({
    title: { type: String },
    price: { type: String },
    genre: { type: String },
    description: { type: String },
    fileSource: { type: String },
    fileKey: { type: String },
  }).validator(),
  run(beat) {
    let timeStamp = moment().format('X');
    const userName = Meteor.user().username != null ? Meteor.user().username : Meteor.user().profile.name
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tracks.insert({ 
      title: beat.title,
      genre: beat.genre,
      fileSource: beat.fileSource,
      fileKey: beat.fileKey,
      createdAt: timeStamp,
      owner: Meteor.userId(),
      username: userName,
      likedBy: [],
      plays: 0
    });
  },
});

/*
 * Removes a track from the database
 * @param {string} trackId - the id of the track to delete
 * 
 */
export const removeTrack = new ValidatedMethod({
  name: "Tracks.methods.remove",
  validate: new SimpleSchema({
    trackId: { type: String },
  }).validator(),
  run( {trackId} ) {
    const track = Tracks.findOne(trackId);
    if (track.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tracks.remove(trackId);
    if (this.isSimulation) {

    } else {

      Delete.deleteFromS3(track.fileKey);
    }
  }
});

/*
 * Adds a user to the likedBy array, increases like count
 * @param {string} trackId - the id of the track to add user like to
 * 
 */
export const likeTrack = new ValidatedMethod({
  name: "Tracks.methods.like",
  validate: new SimpleSchema({
    trackId: { type: String },
  }).validator(),
  run( {trackId } ) {
    const track = Tracks.findOne(trackId);
    const user = this.userId
    Tracks.update(track, { $addToSet: { likedBy: user } });
  }
});


/*
 * Increments a song's playcount, (string info only)
 * @param {string} title - the title of the track
 * 
 */
export const incrementTrackPlayCount = new ValidatedMethod({
  name: "Tracks.methods.incrementPlayCount",
  validate: new SimpleSchema({
    trackId: { type: String }
  }).validator(),
  run( { trackId }) {   
    Tracks.update(trackId, { $inc: { plays: 1 } });
  }
});


/*
 * sets a tracks visibility to private
 * @param {string} trackId - the title of the track
 * @param {boolean} setPrivate - should song be set to private visibility 
 * 
 */
export const setTrackPrivate = new ValidatedMethod({
  name: "Tracks.methods.setTrackPrivate",
  validate: new SimpleSchema({
    trackId: { type: String },
    setPrivate: { type: Boolean },
  }).validator(),
  run( { trackId, setPrivate} ) {
    const track = Tracks.findOne(trackId);
    if (track.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Tracks.update(trackId, { $set: { private: setPrivate } });
  }
});

