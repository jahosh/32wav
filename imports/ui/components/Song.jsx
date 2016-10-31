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

  }
  handleReady(wavesurfer) {
    this.setState({
      loading: false,
      ready: true,
    });
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
     <div> 
       <li className="collection-item avatar" key={this.props.song._id}>
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
          <i className="fa fa-usd" aria-hidden="true"></i>
          <i className="fa fa-usd" aria-hidden="true"></i>
          <i className="material-icons">payment</i>
          <a className="btn-flat btn-small disabled" id="payment-tag">
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