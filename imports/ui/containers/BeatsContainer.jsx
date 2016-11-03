import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import BeatsList from '../components/BeatsList.jsx';
import Song from '../components/Song.jsx';
import BeatCategories from '../components/BeatCategories';

class BeatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }
  renderSongs() {
    let filteredSongs = this.props.beats;
    if (this.state.hideCompleted) {
      filteredSongs = filteredSongs.filter( song => !song.checked);
    }
    return filteredSongs.map( (song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = song.owner === currentUserId;
      const currentUser = Meteor.user();
      const source = song.fileSource;    
      return (
        <Song 
          key={song._id} 
          song={song}
          source={song.fileSource}
          showPrivateButton={showPrivateButton}
          currentUser={currentUser}
        />
      );
    });
  }
  render() {
    return (
      <div className="col s12 m12 l10 offset-l1">
       <BeatsList
          handleRenderSongs={this.renderSongs.bind(this)} 
        />
      </div>
    )
  }
}

BeatsContainer.PropTypes = {
  beats: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, BeatsContainer);
