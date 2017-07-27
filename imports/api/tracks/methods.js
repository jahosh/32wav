import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { moment } from 'meteor/momentjs:moment';
import { HTTP } from 'meteor/http';
import { Email } from 'meteor/email';

import deleteFromS3 from '../../modules/server/deletefromS3';


// mongo collections
import Tracks from './Tracks';
// import Users from '../users/Users';

Meteor.methods({
  'tracks.insert': function tracksInsert(track) {
    check(track, {
      title: String,
      artist: String,    
      genre: String,
      fileSource: String,
      fileKey: String,
      setPrivate: Boolean,
      trackImage: String,
      download: Boolean,
    });

    if (!this.userId) {
      throw new Meteor.Error('please sign-in to upload');
    }

    const timestamp = moment().format('X');
    const username = Meteor.user().username;
    let imgSrc = '';

    // console.log('this is track image', track.trackImage);

    if (track.trackImage !== "./32wav.jpg") {
      imgSrc = "https://s3-us-west-1.amazonaws.com/jahosh-meteor-files-resized/images" + track.trackImage.slice(61);
    } else {
      imgSrc = track.trackImage;
    }
    try {
      const c = Tracks.insert({
        title: track.title,
        artist: track.artist,
        genre: track.genre,
        fileSource: track.fileSource,
        fileKey: track.fileKey,
        createdAt: timestamp,
        updatedAt: timestamp,
        owner: Meteor.userId(),
        username: username,
        setPrivate: track.setPrivate,
        trackImage: imgSrc,
        likes: 0,
        plays: 0,
        download: track.download,
        price: 0
      });  
      console.log('this c', c);
    } catch(e) {
      throw new Meteor.Error('500', e);
    }
  },
  'tracks.remove': function tracksRemove(trackToDelete) {
    check(trackToDelete, {
      trackId: String
    });

    try {
      const track = Tracks.findOne(trackToDelete.trackId);

      if (track.owner !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Tracks.remove(track._id);
      if (this.isSimulation) {
      } else {
        deleteFromS3(track.fileKey);
      }
    } catch(e) {
      throw new Meteor.Error('500', e);
    }
  },
  'tracks.update': function tracksUpdate(trackObj) {
    check(trackObj, {
      trackId: String,
      trackname: String
    });

    try {
      const track = Tracks.findOne(trackObj.trackId);

      if (track.owner !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Tracks.update(track._id, { $set: { title: trackObj.trackname } });
    } catch(e) {
      console.log(e);
      throw new Meteor.Error('500', e);
    }
  },
  'tracks.like': function tracksLike(trackToDelete) {
    check(trackToDelete, {
      trackId: String
    });

    try {
    const track = Tracks.findOne(trackToDelete.trackId);
    const user = Meteor.users.findOne(this.userId);

    Meteor.users.update(user, { $addToSet: { likes: track._id }});
    Tracks.update(track, { $inc: { likes: 1 } });
    } catch(e) {
      throw new Meteor.Error('500', e);
    }

    
  },
  'tracks.incrementPlayCount': function tracksIncrement(track) {
    check(track, {
      trackId: String
    });

    Tracks.update(track.trackId, { $inc: { plays: 1 }});
  },
  'tracks.setPrivate': function tracksSetPrivate(track) {
    check(track, {
      trackId: String,
      setPrivate: Boolean
    });

    console.log(track);

    try {
      const selectedTrack = Tracks.findOne(track.trackId);
      
      if (selectedTrack.owner !== this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      console.log(selectedTrack);
      const c = Tracks.update({_id: track.trackId}, { $set: { setPrivate: track.setPrivate }});
      console.log(c);
    } catch(e) {
      console.log(e);
      throw new Meteor.Error('500', e);
    }
  },
  'tracks.toggleTrackDownload': function tracksToggleTrackDownload(trackObj) {
    check(trackObj, {
      trackId: String,
      downloadState: Boolean
    });

    try {

      const track = Tracks.findOne(trackObj.trackId);

      if (track.owner !== this.userId) {
        throw new Meteor.Error("not-authorized, you don't own this track");
      }
      
      Tracks.update({ _id: trackObj.trackId }, { $set: { download: trackObj.downloadState }});
    } catch(e) {
      throw new Meteor.Error('500', e);
    }

  },
  'tracks.sendTrack': function tracksSendTrack(link, cb) {
    check(link, String);
    const track = Tracks.findOne({ _id: "Jsv4rHj2STuGKXwcL" });
    const s3 = new AWS.S3();

    try {
      Meteor.defer( () => {
        Email.send(({
          to: "josh91hickman@gmail.com",
          from: "no-reply@32wav.io",
          subject: `${track.username} sent you: ${track.title}`,
          text: "you've been sent a track!",
          html: 'Embedded image: <img src="cid:cover"/>',
          attachments: [
            {
              filename: `${track.title}.mp3`,
              path: track.fileSource,
              contentType: 'mp3'
            }, 
            {
              filename: `${track.title}`,
              path: track.trackImage,
              cid: 'cover'
            }
          ]
        }))
      })
    } catch(e) {
      throw new Error('something went wrong');
    }
  }
})
// export const sendTrack = new ValidatedMethod({
//   name: "Tracks.methods.sendTrack",
//   validate: new SimpleSchema(string).validator(),
//   run( link ) {


//     // HTTP.call('POST', 'https://file.io/?expires=1w', {
//     //   content: source,
//     //   headers: { "x-": "*" }
//     // }, (err, res) => {
//     //   if (err) {
//     //     console.log(err);
//     //     return;
//     //   }
//     //   console.log(res);
//     // });
//   }
// })




/*
 * Adds a Track to the database, (string info only)
 * @param {string} title - the title of the track
 */
// export const insertTrack = new ValidatedMethod({
//   name: "Tracks.methods.insert",
//   validate: new SimpleSchema({
//     title: { type: String },
//     artist: { type: String },
//     genre: { type: String },
//     fileSource: { type: String },
//     fileKey: { type: String },
//     setPrivate: { type: Boolean },
//     trackImage: { type: String },
//     download: { type: Boolean }
//   }).validator(),
//   run(track) {
//     let timeStamp = moment().format('X'),
//         userName  = Meteor.user().username != null ? Meteor.user().username : Meteor.user().profile.name;

//     if (!this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Tracks.insert({ 
//       title: track.title,
//       genre: track.genre,
//       artistName: track.artistName,
//       fileSource: track.fileSource,
//       fileKey: track.fileKey,
//       createdAt: timeStamp,
//       owner: Meteor.userId(),
//       username: userName,
//       setPrivate: track.setPrivate,
//       trackImage: track.trackImage,
//       download: track.download,
//       likedBy: [],
//       plays: 0
//     });
//   },
// });

/*
 * Removes a track from the database
 * @param {string} trackId - the id of the track to delete
 * 
 */
// export const removeTrack = new ValidatedMethod({
//   name: "Tracks.methods.remove",
//   validate: new SimpleSchema({
//     trackId: { type: String },
//   }).validator(),
//   run( {trackId} ) {
//     const track = Tracks.findOne(trackId);
//     if (track.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Tracks.remove(trackId);
//     if (this.isSimulation) {

//     } else {

//       Delete.deleteFromS3(track.fileKey);
//     }
//   }
// });

/*
 * Updates a track's metadata
 * @param {string} trackId - the id of the track to be updated
 * @param {object} payload - containing all of the new track metadata
 * 
 */

// export const updateTrack = new ValidatedMethod({
//   name: "Tracks.methods.update",
//   validate: new SimpleSchema({
//     trackId: { type: String },
//     trackName: { type: String },
//   }).validator(),
//   run( {trackId, trackName }) {
//     const track = Tracks.findOne(trackId);
//     console.log(track);
//     if (track.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }

//     Tracks.update(trackId, { $set: { title:trackName } });
//   }
// });

/*
 * Adds a user to the likedBy array, increases like count
 * @param {string} trackId - the id of the track to add user like to
 * 
 */
// export const likeTrack = new ValidatedMethod({
//   name: "Tracks.methods.like",
//   validate: new SimpleSchema({
//     trackId: { type: String },
//   }).validator(),
//   run( {trackId } ) {
//     const track = Tracks.findOne(trackId);
//     const user = this.userId
//     Tracks.update(track, { $addToSet: { likedBy: user } });
//   }
// });


/*
 * Increments a song's playcount, (string info only)
 * @param {string} title - the title of the track
 * 
 */
// export const incrementTrackPlayCount = new ValidatedMethod({
//   name: "Tracks.methods.incrementPlayCount",
//   validate: new SimpleSchema({
//     trackId: { type: String }
//   }).validator(),
//   run( { trackId }) {   
//     Tracks.update(trackId, { $inc: { plays: 1 } });
//   }
// });


/*
 * sets a tracks visibility to private
 * @param {string} trackId - the title of the track
 * @param {boolean} setPrivate - should song be set to private visibility 
 * 
 */
// export const setTrackPrivate = new ValidatedMethod({
//   name: "Tracks.methods.setTrackPrivate",
//   validate: new SimpleSchema({
//     trackId: { type: String },
//     setPrivate: { type: Boolean },
//   }).validator(),
//   run( { trackId, setPrivate} ) {
//     const track = Tracks.findOne(trackId);
//     if (track.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Tracks.update(trackId, { $set: { private: setPrivate } });
//   }
// });

// export const toggleTrackDownloadStatus = new ValidatedMethod({
//   name: "Tracks.methods.toggleTrackDownloadStatus",
//   validate: new SimpleSchema({
//     trackId: { type: String },
//     downloadState: { type: Boolean },
//   }).validator(),
//   run( { trackId, downloadState } ) {
//     const track = Tracks.findOne(trackId);
//     if (track.owner !== this.userId) {
//       throw new Meteor.Error("not-authorized, you don't own this track");
//     }
//     Tracks.update(trackId, { $set: { download: downloadState }});
//   }
// });


// export const updateTrackImage = new ValidatedMethod({
//   name: "Tracks.methods.updateTrackImage",
//   validate: new SimpleSchema({
//     source: { type: String },
//   }).validator(),
//   run( { source } ) {

//   }
// });