
 import { moment } from 'meteor/momentjs:moment';
 import { Random } from 'meteor/random';
 
   
  Accounts.onCreateUser((options, user) => {
     
    const timeStamp = moment().format('MMMM Do YYYY');
    let email;
    let username;
    let verified = false;
    let randomnizer = Random.id(6);
    let profile_img = "./defaultAvatar.jpeg";
  
    
      const userToCreate = user;
  
      if (user.services.facebook) {
          email = user.services.facebook.email;
          username = `${user.services.facebook.name}_${randomnizer}`;
        }
  
      if (user.services.google) {
          email = user.services.google.email;
          username = `${user.services.google.name}_${randomnizer}`;
      
            if (user.services.google.picture) {
                profile_img = user.services.google.picture;
          
                }
      
            if (user.services.google.verified_email) {
                verified = true;
              }
        }
  
      if (options.profile) userToCreate.profile = options.profile;
  
      if (!user.services.password) {
          userToCreate.emails = [{ address: email, verified: verified }];
          userToCreate.username = username;
        }
    userToCreate.profile_img = profile_img;
    userToCreate.socials = { };
    userToCreate.createdAt = timeStamp;
    return userToCreate;
});