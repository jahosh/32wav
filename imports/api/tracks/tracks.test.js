/* eslint-env mocha */

import { assert } from 'meteor/practicalmeteor:chai'
import Tracks from './tracks.js';

describe('Tracks collection', function() {
  it('registers the collection with Mongo properly', function() {
    assert.equal(typeof Tracks, 'object');
  });
});