
const Users = Meteor.users;

Users.friendlySlugs({
  slugFrom: 'username',
  slugField: 'slug',
  distinct: true,
});

if (Meteor.isServer) {

  Meteor.startup(() => {
    const users = Users.find({ slug: { $exists: false } }, { limit: 50 });
    let count = 0;

    users.forEach((t) => {
      Users.update({ _id: t._id }, { $set: { fake: '' } });
      count += 1;
    });

    console.log(`Updated slugs for ${count} Users`);
  });
}

export default Users;