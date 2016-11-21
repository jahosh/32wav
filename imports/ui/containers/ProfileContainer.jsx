import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';

//containers
import TrackContainer from './TrackContainer.jsx';

class ProfileContainer extends Component {
  componentDidMount() {
 
  }
  renderSong() {
      const tracks      = this.props.userTracks;
      const currentUser = this.props.currentUser;
     return tracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
        return (
          <Track 
            key={track._id} 
            song={track}
            source={track.fileSource}
            showPrivateButton={showPrivateButton}
            currentUser={currentUser}
          />
        );
     });
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> :
        <div>
        <h1 className="center-align">
          {this.props.params.username}'s Profile
        </h1>
          <TracksList
            handleRenderTracks={this.renderSong.bind(this)}
          /> 
        }
          </div> 
        }
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
 userTracks: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const username = props.params.username;
  const subscription = Meteor.subscribe('Tracks.all');
  const loading = !subscription.ready();
  const userTracks = Tracks.find({username: username }, { sort: { createdAt: -1 } }).fetch();
  return {
   userTracks: userTracks,
   username: username,
   loading: loading,
  };
}, ProfileContainer);
