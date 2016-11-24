Accounts.onCreateUser((options, user) => {
  if (user.services.twitter) {
    const { profile_image_url, screenName } = user.services.twitter;

    user.profile_img = profile_image_url.replace(/(_normal)/i, '');
    user.username = screenName;
    user.emails = [
      {
        "address": "test1234@test.com",
        "verified": false
      },
    ]

    return user;
  }
});