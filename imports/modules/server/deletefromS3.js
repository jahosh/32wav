AWS.config.update({
  accessKeyId: Meteor.settings.private.s3AccessId,
  secretAccessKey: Meteor.settings.private.s3AccessKey,
});

export default key => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: Meteor.settings.private.s3Bucket,
      Key: key,
    };

    const deleteTrack = Meteor.wrapAsync(
      s3.deleteObject(params, function (err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      })
    );
  }
