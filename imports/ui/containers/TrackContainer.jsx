import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//containers
import TracksContainer from './TracksContainer.jsx';

class TrackContainer extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> :
        <TracksContainer
          tracks={this.props.userTracks}
          currentUser={this.props.currentUser}
        />  
        }
     </div>
    );
  }
}

TrackContainer.PropTypes = {
 userTracks: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks.all');
  const loading = !subscription.ready();
  const username = props.params.username;
  const track = props.params.track
  const findOneTrack = { username: username, title: track };
  const findAllTracks = { username: username };

  console.log(props);
  const userTracks = Tracks.find({username: username, title: track }).fetch();
  console.log(userTracks);
  return {
   userTracks: userTracks,
   track: track,
  };
}, TrackContainer);