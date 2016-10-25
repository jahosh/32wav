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
      loading: true,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleLoading = this.handleLoading.bind(this)
    this.handleReady = this.handleReady.bind(this);
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
  handleLoading(int, int2) {
    console.log(int2);
    let value = int.originalArgs[0]
    console.log(value);

    console.log('loading...');
  }
  handleReady() {
    this.setState({
      loading: false,
      ready: true,
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
    /* not used right now ~ later
      const songClassName = classnames({
        checked: this.props.song.checked + ' song',
        private: this.props.song.private + ' song',
      });
      */

      const options = {
        height: 50,
        cursorColor: '#0000',
        progressColor: '#FF6347',
        barWidth: 2,
        maxCanvasWidth: 200,
        cursorWidth: 3
      }

    return (
     <div className="col l12">
      <li className=" col l12 collection-item avatar song">
        <i className="material-icons circle">folder</i>
        <span className="title"><b>{this.props.song.username}</b></span> <br />
        {this.props.song.title}
        <p> { /* <audio preload="none" controls src={this.props.source} id="mp3Plaer"></audio> */}<br />
            {this.props.song.fileName}
        </p>

        
        { this.state.playing ? 
          <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="50px" /> :
          <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="50px" /> 
        }

        { this.state.loading ? <div className="loader">Loading...</div> : '' }
        
        <Wavesurfer 
          audioFile={this.props.source}
          options={options}
          pos={this.state.pos}
          onLoading={this.handleLoading}
          onReady={this.handleReady}
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