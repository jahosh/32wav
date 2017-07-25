import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import deleteFromS3 from '../../../modules/server/deletefromS3';

Meteor.methods({
  'utility.deleteFromS3': function deleteFromS3(key) {
    check(key, String);

    return deleteFromS3(key);
  }
})