import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Session } from 'meteor/session';
import Wavesurfer from 'react-wavesurfer';

import { Songs } from '../../api/songs.js';

export default class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      pos: 0
    };

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
  }
  handleTogglePlay() {
    this.setState({
      playing: !this.state.playing
    });
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  play() {
    console.log('clicked');
  }
  toggleChecked() {
    //toggle a song checked
    Meteor.call('songs.setChecked', this.props.song._id, !this.props.song.checked, function(err) {
      if (err) {
        
        Bert.alert('Permission denied', 'danger', 'growl-top-right');
      }
    });
  }
  likeSong() {
      let selectedBeat = this.props.song._id;
      
    Meteor.call('songs.like', selectedBeat, function(err) {
      if (err){
        Bert.alert('Uh-oh, try again', 'danger', 'growl-top-right');      
      }

      //has song been liked already? if so show that user has unliked song
      Bert.alert('Beat Liked', 'success', 'growl-top-right') 
      
    });
  }
  deleteSong() {
    Meteor.call('songs.remove', this.props.song._id, (err) => {
      if (err) {
        Bert.timer = 5;
        Bert.alert('Cannot delete song', 'danger', 'fixed-top');
      }
    });
  }
  togglePrivate() {
    Meteor.call('songs.setPrivate', this.props.song._id, !this.props.song.private);
  }
  render() {
      const songClassName = classnames({
        checked: this.props.song.checked + ' song',
        private: this.props.song.private + ' song',
      });
    return (
     <div>
      <li className="collection-item avatar song">
        <i className="material-icons circle">folder</i>
        <span className="title"><b>{this.props.song.username}</b></span> <br />
        {this.props.song.title}
        <p> { /* <audio preload="none" controls src={this.props.source} id="mp3Plaer"></audio> */}<br />
            {this.props.song.fileName}
        </p>

        
        { this.state.playing ? 
          <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="25px" /> :
          <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="25px" /> 
        }

        <Wavesurfer 
          audioFile={this.props.source} 
          pos={this.state.pos}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
        />
        <a href="#!" onClick={this.likeSong.bind(this)} className="secondary-content"><i className="material-icons">grade</i></a>

        <button className="delete" onClick={this.deleteSong.bind(this)}>
          &times;
        </button>
        
        <input 
          type="checkbox"
          readOnly
          checked={this.props.song.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        {this.props.showPrivateButton ? (
          <a className="btn-flat btn-small disabled songPrivacy" onClick={this.togglePrivate.bind(this)}>
            {this.props.song.private ? 'Private' : 'Public'}
          </a>
        ): '' }
      
    
      </li>
    </div>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};