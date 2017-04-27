Meteor.methods({
  sendVerificationLink(user) {
    this.unblock();
    
    let userId = Meteor.userId();
    if ( userId ) {
  
        return Accounts.sendVerificationEmail(userId);
    }
  }
});