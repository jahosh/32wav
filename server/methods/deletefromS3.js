Delete = {
  deleteFromS3(key) {
    AWS.config.update({
      accessKeyId: Meteor.settings.s3AccessId,
      secretAccessKey: Meteor.settings.s3AccessKey,
    });
    const s3 = new AWS.S3();
    const params = {
      Bucket: Meteor.settings.s3Bucket,
      Key: key,
    };

    const deleteTrack = Meteor.wrapAsync(
      s3.deleteObject(params, function(err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      })
    );
  }
}

export default Delete;