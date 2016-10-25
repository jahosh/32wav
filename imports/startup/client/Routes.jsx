import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

//home page
import App from '../../ui/components/App.jsx';


Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App } />
    </Router>,
    document.getElementById('app')
  );
});