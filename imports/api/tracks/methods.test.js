/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { moment } from 'meteor/momentjs:moment';
import Tracks from './tracks.js';
import { insertTrack, removeTrack } from './methods.js';

describe("Tracks methods", function() {
  beforeEach(function() {
    if (Meteor.isServer) {
      //resetDatabase();
    }
  });
  it('inserts a track into the Tracks collection', function() {
 
  });
});



