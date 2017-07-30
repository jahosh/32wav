import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import SimpleSchema from 'simpl-schema';

const Tracks = new Mongo.Collection('Tracks');

Tracks.friendlySlugs([
  {
    slugFrom: 'title',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  },
  {
    slugFrom: 'username',
    slugField: 'userSlug',
    distinct: false,
    updateSlug: true
  }
]);

if (Meteor.isServer) {
  Tracks._ensureIndex( { title: 1, username: 1 } ); 

  Meteor.startup(() => {
    const traks = Tracks.find({ userSlug: { $exists: false } }, { limit: 50 });
    let count = 0;

    // traks.forEach((t) => {
    //   Tracks.update({_id: t._id}, { $unset: { "friendlySlugs.userSlug": "", userSlug: "" }});
    // })

    traks.forEach((t) => {
      Tracks.update({ _id: t._id }, { $set: { fake: '' } });
      count += 1;
    });

    console.log(`Updated slugs for ${count} Tracks`);
  });
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





