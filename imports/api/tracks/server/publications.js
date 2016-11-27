import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Tracks from '../tracks';

if (Meteor.isServer) {

  /* Publication for Browse Page */
  Meteor.publish('Tracks.all', function tracksPublication(){
    return Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    });
  });

    /* Publication for Purchase Page */
    Meteor.publish('Tracks.purchase', function tracksPublication(trackId){
    return Tracks.find({trackId,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { fields: { "title": 1, price: 1, } }, { limit: 1, sort  : { createdAt: -1 },
    });
  });

  /* Publication for Account Page */
  Meteor.publish('users.info', function tracksPublication(username){
    return [ Tracks.find({ username: username,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    }),
      Meteor.users.find({ "username": username  }, { fields: { "createdAt": 1, username: 1, profile_img: 1, bio: 1, twitter: 1 } })
    ]
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

