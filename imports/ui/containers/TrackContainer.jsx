import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//containers
import TracksContainer from './TracksContainer.jsx';

class TrackContainer extends Component {
  render() {
    return (
      <div>
        <TracksContainer
          beats={this.props.userTrack}
          currentUser={this.props.currentUser}
        />  
     </div>
    );
  }
}

TrackContainer.PropTypes = {
 userBeats: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks');
  const loading = !subscription.ready();
  const username = props.params.username;
  const track = props.params.track
  const userTrack = Tracks.find({username: username, title: track }).fetch();
  return {
   userBeats: userTrack,
   track: track,
  };
}, TrackContainer);