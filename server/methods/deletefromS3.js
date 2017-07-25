AWS.config.update({
  accessKeyId: Meteor.settings.private.s3AccessId,
  secretAccessKey: Meteor.settings.private.s3AccessKey,
});

export default deleteFromS3 = key => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: Meteor.settings.private.s3Bucket,
    Key: key,
  };
  Meteor.wrapAsync(
    s3.deleteObject(params, function (err, data) {
      if (err) {
        throw new Error(err);
      }
      console.log('deleted successfully', data);
    })
  );
}


