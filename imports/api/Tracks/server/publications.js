import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import Tracks from '../Tracks';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
import { publishPagination } from 'meteor/kurounin:pagination';

const MAX_TRACKS = 5;

publishPagination(Tracks, {
  name: 'tracks.paginatedList'
});

  /* Publication for Browse Page */
  Meteor.publish('Tracks.all', function tracksPublication(limit){
    new SimpleSchema({
      limit: { type: Number }
    }).validate({ limit });
    // Counts.publish(this, 'total-tracks', Tracks.find(), { noReady: true, nonReactive: true });

    return  Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }, limit: limit
    })
  });

  /* Publication for Edit Page */
  Meteor.publish('Tracks.edit', function tracksPublication(trackId){
    new SimpleSchema({
      trackId: { type: String }
    }).validate({ trackId });


    const user = Tracks.findOne(trackId);
    return [ Tracks.find({_id: trackId,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { fields: { title: 1, private: 1, genre: 1, trackImage: 1, _id: 1, owner: 1, download: 1 },
    })
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
      Meteor.users.find({ "slug": username  }, { fields: { "createdAt": 1, username: 1, slug: 1, profile_img: 1, bio: 1, socials: 1, location: 1 } })
    ]
  });

    /* Publication for All Tracks Edit Page */
  Meteor.publish('Tracks.all.edit', function tracksPublication(){


    const currentUser = this.userId;

    return [ Tracks.find({ owner: currentUser,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    }),
      Meteor.users.find({ "_id": currentUser  }, { fields: { "createdAt": 1, username: 1} })
    ]
  });
  
  /* Publication for Search */
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

