import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';

// mongo collection
import { Beats } from '../../api/beats/beats.js';
import { Mp3s } from '../../api/beats/mp3s.js';

//react components
import Header from './Header.jsx';
import Song from './Song.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Navbar from './Navbar.jsx';
import FileUpload from './FileUpload.jsx';
import Uploader from './Uploader.jsx';
import BeatsList from './BeatsList.jsx';

//template helpers
import Upload from '../../photoupload.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }
  componentDidMount() {
   console.log('rendered');
  }
  handleSubmitUpload(event) {
    event.preventDefault();

    const files = ReactDOM.findDOMNode(this.refs.songlink).files[0];

     if (files !== undefined) {
      //alert('please select a file');
      const file  = ReactDOM.findDOMNode(this.refs.songlink).files[0].name;
    }

    const title = ReactDOM.findDOMNode(this.refs.songTitle).value.trim();
    
    Meteor.call('songs.insert', title, file);
    
    ReactDOM.findDOMNode(this.refs.songTitle).value = '';
    ReactDOM.findDOMNode(this.refs.songlink).value = '';
  }
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
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
      <div className="row">
        <Navbar
          user={this.props.currentUser} 
        />
        <BeatsList
          handleRenderSongs={this.renderSongs.bind(this)} 
        />

        { this.props.currentUser ? 
        <FileUpload
          currentUser={this.props.currentUser}
          onHandleSubmitUpload={this.handleSubmitUpload}
        /> : '' 
        }
      </div>
    );
  }
}

App.propTypes = {
  beats: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  Meteor.subscribe('beats');
  return {
    beats: Beats.find({}, { limit: 3, sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Beats.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);