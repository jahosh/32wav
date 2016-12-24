import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Tracks from '../tracks';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';

const MAX_TRACKS = 5;

if (Meteor.isServer) {

  /* Publication for Browse Page */
  Meteor.publish('Tracks.all', function tracksPublication(limit){
    new SimpleSchema({
      limit: { type: Number }
    }).validate({ limit });

    return  Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }, limit: limit
    })
  });

  /* Publication for Purchase Page */
  Meteor.publish('Tracks.purchase', function tracksPublication(trackId){
    new SimpleSchema({
      trackId: { type: String }
    }).validate({ trackId });

    const user = Tracks.findOne(trackId);
    return [ Tracks.find({_id: trackId,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { fields: { title: 1, price: 1, owner: 1 },
    }),
      Meteor.users.find({ _id: user.owner }, { fields: { paypal: 1 } })
    ]
  });

  /* Publication for Account Page */
  Meteor.publish('users.info', function tracksPublication(username){
    return [ Tracks.find({ username: username,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    }),
      Meteor.users.find({ "username": username  }, { fields: { "createdAt": 1, username: 1, profile_img: 1, bio: 1, twitter: 1, location: 1 } })
    ]
  });
  

  Meteor.publish('Tracks.search', function(search) {
    check(search, Match.OneOf( String, null, undefined) );

    let query = [],
        userQuery = [],
        projection = { limit: 10, sort: { title: 1 } };

        if (search) {
          let regex = new RegExp(search, 'i');

          query = {
            $or: [
              { title: regex },
              { username: regex }
            ]
          };

          userQuery = {
            username: regex
          }

          projection.limit = 100;
        }

        return [
          Tracks.find(query, projection),
          Meteor.users.find(userQuery)
        ];
  });

  /*

  Meteor.publishComposite('users.info', function(username) {
    return {
      find: function() {
        return Tracks.find({
          $or: [
            { private: { $ne: true } },
            { owner: this.userId },
          ]}, { sort  : { createdAt: -1 }
        });
      },
      children: [
        {
          find: function(username) {
            return 
          }
        },
      ]
    }
  });
  */
}

