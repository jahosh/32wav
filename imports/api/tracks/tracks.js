import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Tracks = new Mongo.Collection('Tracks');
export default Tracks;

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


/*

Tracks.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the track',
  },
  genre: {
    type: String,
    label: 'Genre of the track',
  }.

})
*/




