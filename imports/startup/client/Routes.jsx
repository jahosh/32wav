import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//home page
import App from '../../ui/components/App.jsx';
import  AppContainer  from '../../ui/containers/AppContainer.jsx';
import  MyAccountContainer from '../../ui/containers/MyAccountContainer.jsx';

import ContactPage from '../../ui/components/ContactForm.jsx';
import UploadPage from '../../ui/containers/UploadContainer.jsx';


import Song from '../../ui/components/Song.jsx';

/*
const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathName: nextState.location.pathname},
    });
  }
};
*/


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={App}  />
      <Route path="/upload" component={UploadPage}  />
      <Route path="/myaccount" component={MyAccountContainer} />
      <Route path="/contact" component={ContactPage} />
    </Route>
  </Router>
);

Meteor.startup( () => {
  render(renderRoutes(), document.getElementById('app'));
});