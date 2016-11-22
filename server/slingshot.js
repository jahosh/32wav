"use strict"

import config from './slingshot_config.js';


Slingshot.fileRestrictions("uploadToAmazonS3", {
  allowedFileTypes: ["audio/mp3", "audio/mpeg", "audio/x-m4a"],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective("uploadToAmazonS3", Slingshot.S3Storage, {
  AWSAccessKeyId: Meteor.settings.s3AccessId,
  AWSSecretAccessKey: Meteor.settings.s3AccessKey,
  bucket: "jahosh-meteor-files",
  acl: "public-read",
  region: "us-west-2",
  authorize: function () {
    if (!this.userId) {
      let message = "Please login before posting images";
      throw new Meteor.Error("Login Required", message);
    }
    return true;
  },
  key: function (file) {
    let currentUserId = this.userId;
    return file.name;
  }
});