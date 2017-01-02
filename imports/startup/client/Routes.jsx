import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';

//containers
import  App  from '../../ui/components/Home/App.jsx';
import AppContainer  from '../../ui/containers/AppContainer.jsx';
import MyAccountContainer from '../../ui/containers/MyAccountContainer.jsx';
import BrowseContainer from '../../ui/containers/BrowseContainer.jsx';
import ContactContainer from '../../ui/containers/ContactContainer.jsx';
import UploadContainer from '../../ui/containers/UploadContainer.jsx';
import ProfileContainer from '../../ui/containers/ProfileContainer.jsx';
import TrackContainer from '../../ui/containers/TrackContainer.jsx';
import PurchaseContainer from '../../ui/containers/PurchaseContainer.jsx';
import SearchContainer from '../../ui/containers/SearchContainer.jsx';
import MessagesContainer from '../../ui/containers/MessagesContainer.jsx';

//pages
import { NotFound } from '../../ui/pages/NotFound.jsx';
import { FAQ } from '../../ui/pages/FAQ.jsx';
import { SignIn } from '../../ui/pages/SignIn.jsx';
import { VerifyEmail } from '../../ui/pages/VerifyEmail.jsx';
import { FileShare } from '../../ui/pages/FileShare.jsx';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {

    replace({
      pathname: '/signin',
      state: { nextPathName: nextState.location.pathname},
    });
        Bert.alert({
          type: 'signin',
          style: 'fixed-top',
          message: "Please sign-in to access that page",
          icon: 'fa-user'
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
      <Route path="/browse" component={BrowseContainer} />
      <Route path="/browse/:limit" component={BrowseContainer} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={ContactContainer} />
      <Route path="/send" component={FileShare} />
      <Route path="/messages/:userId" component={MessagesContainer} />
      <Route path="/purchase/:trackId" component={PurchaseContainer} />
      <Route path="/verify-email/:token" component={VerifyEmail} />
      <Route path="/search/:term" component={SearchContainer} />
      <Route path="/:username" component={ProfileContainer} />
      <Route path="/:username/:track" component={TrackContainer} /> 
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
);

Meteor.startup( () => {
  render(renderRoutes(), document.getElementById('app'));
});