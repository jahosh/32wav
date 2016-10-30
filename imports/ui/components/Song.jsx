import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Session } from 'meteor/session';
import Wavesurfer from 'react-wavesurfer';
import { Link } from 'react-router';

import { Beats } from '../../api/beats/beats.js';

//react components
import Loader from './Loader.jsx';

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
    console.log(props);
  }
  componentDidMount() {
  
  }
  handleTogglePlay() {
   if (!this.state.playing) {
   Meteor.call('beats.incrementPlayCount', this.props.song._id);
   }
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


  }
  toggleChecked() {
    //toggle a song checked
    Meteor.call('beats.setChecked', this.props.song._id, !this.props.song.checked, function(err) {
      if (err) {
        
        Bert.alert('Permission denied', 'danger', 'growl-top-right');
      }
    });
  }
  likeSong() {
    let selectedBeat = this.props.song._id;
  
    Meteor.call('beats.like', selectedBeat, function(err) {
      if (err){
        Bert.alert('Uh-oh, try again', 'danger', 'growl-top-right');      
      }
      //has song been liked already? if so show that user has unliked song
      Materialize.toast('Beat Liked!', 4000) 
      //Bert.alert('Beat Liked', 'success', 'growl-top-right') 
    });
  }
  handleLoading(int, int2) {
var opts = {
  lines: 9 // The number of lines to draw
, length: 28 // The length of each line
, width: 14 // The line thickness
, radius: 42 // The radius of the inner circle
, scale: .5 // Scales overall size of the spinner
, corners: 1 // Corner roundness (0..1)
, color: '#000' // #rgb or #rrggbb or array of colors
, opacity: 0.35 // Opacity of the lines
, rotate: 0 // The rotation offset
, direction: 1 // 1: clockwise, -1: counterclockwise
, speed: 1 // Rounds per second
, trail: 45 // Afterglow percentage
, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
, zIndex: 2e9 // The z-index (defaults to 2000000000)
, className: 'spinner' // The CSS class to assign to the spinner
, top: '50%' // Top position relative to parent
, left: '50%' // Left position relative to parent
, shadow: false // Whether to render a shadow
, hwaccel: false // Whether to use hardware acceleration
, position: 'absolute' // Element positioning
}
    //const target = document.getElementById('spinner');
    //const spinner = new Spinner(opts).spin(target);
  }
  handleReady(wavesurfer) {
    this.setState({
      loading: false,
      ready: true,
    });
    //fix negative playback position here?

  }
  deleteSong() {
    Meteor.call('beats.remove', this.props.song._id, (err) => {
      if (err) {
        Bert.timer = 5;
        Bert.alert('Cannot delete song', 'danger', 'fixed-top');
      }
    });
  }
  togglePrivate() {
    Meteor.call('beats.setPrivate', this.props.song._id, !this.props.song.private, (err) => {
      if (err) {
      Materialize.toast('Unauthorized', 4000) 
      }
    });
  }
  render() {
    /* not used right now ~ later
      const songClassName = classnames({
        checked: this.props.song.checked + ' song',
        private: this.props.song.private + ' song',
      });
      */

      const options = {
        height: 80,
        cursorColor: '#0000',
        progressColor: '#FF6347',
        barWidth: 2,
        maxCanvasWidth: 200,
        cursorWidth: 3,
        hideScrollbar: true
      }
    return (
     <div className="beats"> 
       <li className="collection-item avatar beats" key={this.props.song._id}>
         { this.state.loading ? <Blaze template="spinner" /> : '' }
         <p className="userName center">Produced By: <br /></p>
         <Link to={this.props.song.username}><p className="flow-text center">{this.props.song.username}</p></Link>
         <p className="songTitle center">{this.props.song.title}</p><br />
         <p>{this.props.song.fileName}</p>

        {this.state.playing ? 
          <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="100px" /> :
          <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="100px" /> 
        }      

        <Wavesurfer 
          audioFile={this.props.source}
          options={options}
          pos={this.state.pos}
          onLoading={this.handleLoading}
          onReady={this.handleReady}
          onPosChange={this.handlePosChange}
          playing={this.state.playing}
        />
 
        <div className="stats">
          <p>Total Plays: </p> <span id="plays">{this.props.song.plays}</span> 
          <br />
          <p> Likes: </p> <span id="likes">{this.props.song.likedBy.length}</span>
        </div>

        <div className="beatActions">
        <a href="#!" onClick={this.likeSong.bind(this)} className="secondary-content"><i className="material-icons">grade</i></a>
        
        <button className="delete" onClick={this.deleteSong.bind(this)}>
          &times;
        </button>
        

       
          <a className="btn-flat btn-small disabled songPrivacy" onClick={this.togglePrivate.bind(this)}>
            {this.props.song.private ? 'Private' : 'Public'}
          </a>
          <i className="material-icons">payment</i>
          <a className="btn-flat btn-small disabled inquire">
            Purchase
          </a>
        
      </div>
      </li>
        
    </div>
    );
  }
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};