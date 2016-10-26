const uploader = new ReactiveVar();
const mp3Details = new Mongo.Collection('mp3s');
const currentUserId = Meteor.userId();

import { Template } from 'meteor/templating';


// mongo collection
import { Mp3s } from './api/beats/mp3s.js';



Template.imageUploader.helpers({

  isUploading: function() {
    return Boolean(uploader.get());
  },
  progress: function() {
    const upload = uploader.get();
    if (upload) {
      return Math.round(upload.progress() * 100);
    }
  },

  url: function() {
    return mp3Details.findOne({ uploadedBy: currentUserId}, {sort: { time: -1 } });
  }
})

Template.imageUploader.events({'submit form': function(e, template) {
  e.preventDefault();

  console.log('fired');
  const file = document.getElementById('file').files[0];

  const upload = new Slingshot.Upload("Mp3Uploads");
  const timeStamp = Math.floor(Date.now());

  upload.send(file, function(err, dlURL) {
    uploader.set();
    if (err) {
      console.error(err);
      alert(err);

    } else {
      console.log('success');
      Meteor.subscribe('mp3Details');

      Meteor.call('mp3s.insert', dlURL, timeStamp, currentUserId);

      console.log(dlURL);
     
    }
  });
  uploader.set(upload);
  }
});