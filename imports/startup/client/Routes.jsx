import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//containers
import App from '../../ui/components/App.jsx';
import AppContainer  from '../../ui/containers/AppContainer.jsx';
import MyAccountContainer from '../../ui/containers/MyAccountContainer.jsx';
import ContactContainer from '../../ui/containers/ContactContainer.jsx';
import UploadContainer from '../../ui/containers/UploadContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';

//pages
import { NotFound } from '../../ui/pages/NotFound.jsx';
import { FAQ } from '../../ui/pages/FAQ.jsx';
import { SignIn } from '../../ui/pages/SignIn.jsx';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/signin',
      state: { nextPathName: nextState.location.pathname},
    });
  }
};



export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={App}  />
      <Route path="/upload" component={UploadContainer}  />
      <Route path="/signin" component={SignIn} />
      <Route path="/myaccount" component={MyAccountContainer} onEnter={requireAuth} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={ContactContainer} />
      <Route path="/:username" component={ProfileContainer} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

Meteor.startup( () => {
  render(renderRoutes(), document.getElementById('app'));
});