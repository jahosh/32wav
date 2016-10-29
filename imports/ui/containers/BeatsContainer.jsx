import React, { Component, PropTypes } from 'react';

//Components
import BeatsList from '../components/BeatsList.jsx';
import Song from '../components/Song.jsx';
import BeatCategories from '../components/BeatCategories';

export default class BeatsContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

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
      const currentUser = this.props.currentUser;
      const source = song.fileSource;    
      return (
        <Song 
          key={song._id} 
          song={song}
          source={song.fileSource}
          showPrivateButton={showPrivateButton}
          owner={currentUser}
        />
      );
    });
  }
  render() {
    return (
      <div>
       <BeatsList
          handleRenderSongs={this.renderSongs.bind(this)} 
        />
      </div>
    )
  }
}

BeatsContainer.PropTypes = {
  beats: PropTypes.array.isRequired,
}