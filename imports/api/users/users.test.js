/* eslint-env mocha */
import { assert } from 'meteor/practicalmeteor:chai'
const Users = Meteor.users;


describe('Users collection', function() {
  it('registers the collection with Mongo properly', function() {
    assert.equal(typeof Users, 'object');
  });
});