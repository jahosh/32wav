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

      Materialize.toast('Privacy Toggled', 4000) 
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
        progressColor: '#546E7A',
        barWidth: 2,
        maxCanvasWidth: 200,
        cursorWidth: 3,
        hideScrollbar: true
      }
      const cdnSource = {
        beatUrl: 'https://d2hbl0lksauo4z.cloudfront.net/Jahosh_R2Instrumental.mp3'
      }
    return (
     <div> 
       <li className="collection-item avatar beat" key={this.props.song._id}>
         { this.state.loading ? <Blaze template="spinner" /> : '' }
         <span className="title"><Link to={ '/' + this.props.song.username}><p className="flow-text">{this.props.song.username}</p></Link></span>
         <Link className="track-link" to={ this.props.song.username + '/' + this.props.song.title }><p className="songTitle">{this.props.song.title}</p></Link><br />
         <p>{this.props.song.fileName}</p>

         
        {this.state.playing ? 
          <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="50px" /> :
          <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="50px" /> 
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
        <span data-livestamp={this.props.song.createdAt}></span>

        <div className="beatActions">
        <a href="#!" onClick={this.likeSong.bind(this)} className="secondary-content"><i className="em em-pray"></i></a>
        
  
          <div>
        <button className="delete" onClick={this.deleteSong.bind(this)}>
          &times;
        </button>
        </div>

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