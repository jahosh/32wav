import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import SimpleSchema from 'simpl-schema';

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


Tracks.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the track',
  },
  artist: {
    type: String,
    label: 'Artist of the song/instrumental'
  },
  genre: {
    type: String,
    label: 'Genre of the track',
  },
  fileSource: {
    type: String,
    label: 'Audio data source'
  },
  fileKey: {
    type: String,
    label: 'S3 bucket key name'
  },
  createdAt: {
    type: String,
    label: 'The date the document was created'
  },
  updatedAt: {
    type: String,
    label: 'The date the document was last updated',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    }
  },
  owner: {
    type: String,
    label: '_id of the owner of the document'
  },
  username: {
    type: String,
    label: 'Username of the owner of the document'
  },
  setPrivate: {
    type: Boolean,
    label: 'Status of document privacy'
  },
  trackImage: {
    type: String,
    label: 'Track image source'
  },
  likes: {
    type: SimpleSchema.Integer,
    label: 'Total number of likes'
  },
  plays: {
    type: SimpleSchema.Integer,
    label: 'Total number of plays'
  },
  download: {
    type: Boolean,
    label: 'Status of track download status'
  },
  price: {
    type: SimpleSchema.Integer,
    label: 'The price of the track'
  },
});

Tracks.attachSchema(Tracks.schema);

export default Tracks;





