"use strict"
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

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
