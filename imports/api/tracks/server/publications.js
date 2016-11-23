import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import Tracks from '../tracks';


if (Meteor.isServer) {
  Meteor.publish('Tracks.all', function tracksPublication(){
    return Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    });
  });

  Meteor.publish('Tracks.user', function tracksPublication(username){
    return Tracks.find({ username: username,
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }
    });
  });
}
