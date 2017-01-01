import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { Messages } from '../pages/Messages.jsx';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

class MessagesContainer extends Component {
  render() {
    return (
      <div className="center-align">
      { this.props.loading ? <Blaze template="spinner" /> : 
      <div>
        <Messages />
      </div>
      }
      </div>
    );
  }
}

export default createContainer( (props) => {
  //const userId = props.params.userId;
  //const subscription = Meteor.subscribe('Tracks.purchase', trackId);

  //const loading = !subscription.ready();
  //const track = Tracks.findOne({ _id: trackId });
  //const owner = track ? track.owner : {};
  //const seller = Meteor.users.findOne(owner);
  return {
 
  };
}, MessagesContainer);