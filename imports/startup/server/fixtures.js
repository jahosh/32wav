/**
 * Responsible for setting up dummy users in the database
 */



// import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
// import { Accounts } from 'meteor/accounts-base';

// const initialUsers = [
//   {
//     email: "admin@32wav.com",
//     password: Meteor.settings.private.adminPassword,
//     roles: ['admin'],
//   },
// ];

// initialUsers.forEach(({ email, password, roles }) => {
//   const userExists = Meteor.users.findOne({ 'emails.address': email });

//   if (!userExists) {
//     const userId = Accounts.createUser({ email, password });
//     Roles.addUsersToRoles(userId, roles);
//   }
// });