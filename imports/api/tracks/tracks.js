import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Tracks = new Mongo.Collection('Tracks');
export default Tracks;

