import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Tracks = new Mongo.Collection('Tracks');


if (Meteor.isServer) {
  Tracks._ensureIndex( { title: 1, username: 1 } ); 
}

Tracks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Tracks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


export default Tracks;


