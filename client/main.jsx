import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/client/accounts-config.js';
import '/imports/startup/client'
import AppContainer from '../imports/ui/containers/AppContainer.jsx';
import './main.html';


/*
Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});
*/
