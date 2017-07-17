import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//components
import Track from '../components/Track.jsx';
import TracksList from '../components/TracksList.jsx';

class TrackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      globalPlaying: false
    }

    this.globalPlayer = this.globalPlayer.bind(this);
  }
  globalPlayer(id) {
    this.setState({ globalPlaying: true,  track: id });
  }
  renderSong() {
      const track       = this.props.userTracks[0];
      const currentUser = this.props.currentUser;
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
     return (
       <Track 
          key={track._id} 
          song={track}
          source={track.fileSource}
          showPrivateButton={showPrivateButton}
          currentUser={currentUser}
          globalPlaying={this.globalPlayer.bind(this)}
          globalState={this.state}
        />
     );
  }
  render() {
    const { pagination } = this.props;
    return (
      <div>
        { this.props.loading ? <Blaze template="spinner" /> : 
          <TracksList
            handleRenderTracks={this.renderSong.bind(this)}
            showPagination={false}
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
  const subscription = Meteor.subscribe('Tracks.all', 5);
  const loading = !subscription.ready();
  const username = props.params.username;
  const track = props.params.track
  const userTracks = Tracks.find({username: username, title: track }).fetch();
  const currentUser = Meteor.user();

  return {
   userTracks: userTracks,
   track: track,
   loading: loading,
   currentUser: currentUser,
  };
}, TrackContainer);