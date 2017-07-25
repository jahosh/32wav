
let action;



const updateUser = (userId, profile) => {

  try {
    Meteor.users.update(userId, {
      $set: {
        bio: profile.bio,
        socials: {
          twitter: profile.twitter
        },
        location: profile.location,
        paypal: profile.paypal
      }
    });
  } catch (e) {
    action.reject(`[editProfile.updateUser] ${e}`);
  }
}


const editProfile = ({ userId, profile }, promise) => {

  try {
    action = promise;
    updateUser(userId, profile);
    action.resolve();
  } catch(e) {
    action.reject(`[editProfile.handler] ${e}`);
  }
};

export default options =>
new Promise((resolve, reject) =>
editProfile(options, { resolve, reject }));