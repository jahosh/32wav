import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';
import TracksCategories from '../components/TracksCategories';

class TracksContainer extends Component {
  constructor(props) {
    super(props);
  }
  renderTracks() {
    let filteredTracks = this.props.tracks;
    return filteredTracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
      const currentUser = Meteor.user();
      const source = track.fileSource;    
      return (
        <Track 
          key={track._id} 
          song={track}
          source={source}
          showPrivateButton={showPrivateButton}
          currentUser={currentUser}
        />
      );
    });
  }
  render() {
    return (
      <div className="col s12 m12 l10 offset-l1">
       <TracksList
          handleRenderTracks={this.renderTracks.bind(this)} 
        />
      </div>
    )
  }
}

TracksContainer.PropTypes = {
  tracks: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, TracksContainer);
