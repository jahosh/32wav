"use strict"
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Tracks = new Mongo.Collection('Tracks');

if (Meteor.isServer) {

  Meteor.publish('Tracks', function tracksPublication(limit){
    new SimpleSchema({
      limit: { type: Number }
    }).validate( { limit })
    return Tracks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]}, { sort  : { createdAt: -1 }, limit: limit
    });
  });
}
