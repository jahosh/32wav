import { Accounts } from 'meteor/accounts-base';
import { default as swal } from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.min.css';

/*
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
*/

Accounts.config({
  forbidClientAccountCreation: false
});

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      swal('Good job!', 'Successfully logged in','success')
    }
    if (state === "signUp") {
      // Successfully registered

    }
  }
};


AccountsTemplates.configure({
    confirmPassword: true,
    defaultState: "signIn",
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,
  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,
  homeRoutePath: '/',
    redirectTimeout: 2000,
  onSubmitHook: mySubmitFunc,

  texts: {
    sep: "OR",
      button: {
          signUp: "Register Now!",
          enrollAccount: "Create Account",
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password",
      },
    },

 
});