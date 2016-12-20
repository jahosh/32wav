describe('Sign Up', function() {
  beforeEach(function() {
    server.execute(function() {
      const { Meteor } = require('meteor/meteor');
      const user = Meteor.users.findOne({ 'emails.address': 'mistahhick@gmail.com' });
      if (user) {
        Meteor.users.remove(user._id);
      }
    });
  });

  it('should create a new user and login', function() {
    browser.url('http://localhost:3000/signin')
           .setValue('[name="at-field-username"]', 'Test')
           .setValue('[name="at-field-email"]', 'mistahhick@gmail.com')
           .setValue('[name="at-field-password"]', 'password')
           .setValue('[name="at-field-password_again"]', 'password')
           .submitForm('form');
           expect(browser.getUrl()).to.equal('http://localhost:3000/signin');
  });
});