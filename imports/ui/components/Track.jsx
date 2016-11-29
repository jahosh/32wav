import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Session } from 'meteor/session';
import Wavesurfer from 'react-wavesurfer';
import { Link } from 'react-router';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';

import { Tracks } from '../../api/tracks/tracks.js';

//methods
import { removeTrack } from '../../api/tracks/methods.js';
import { likeTrack } from '../../api/tracks/methods.js'; 
import { incrementTrackPlayCount } from '../../api/tracks/methods.js';
import { setTrackPrivate } from '../../api/tracks/methods.js';


export default class Track extends Component {
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
   if (!this.state.playing) {
   incrementTrackPlayCount.call({ trackId: this.props.song._id});
   
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
  handleLoading() {

  }
  toggleChecked() {
 
  }
  likeSong() {
    let selectedBeat = this.props.song._id;

    likeTrack.call({ trackId: selectedBeat }, (err) => {
      if (err) {
        console.log(err);
        Bert.timer = 5;
        Bert.alert(err.reason, 'danger', 'fixed-top');
      }
      Materialize.toast('Beat Liked!', 4000) 
    })
  }
  handleReady(wavesurfer) {
    this.setState({
      loading: false,
      ready: true,
    });
  }
  deleteSong() {
    let trackId = this.props.song._id;
    swal({
      title: "Are you want to delete this track?",
      text: "You will not be able to recover this file",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
  }).then(function(isConfirm) {
      if (isConfirm) {
        removeTrack.call({ trackId: trackId }, (err) => {
          if (err) {
            console.log(err);
            Bert.timer = 5;
            Bert.alert(err.reason, 'danger', 'fixed-top');
          }
          swal("Deleted!", "The track has been deleted.", "success");
        });

      } else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }
  togglePrivate() {
    setTrackPrivate.call({ trackId: this.props.song._id, setPrivate: !this.props.song.private }), (err) => {
      if (err) {
        Materialize.toast('Unauthorized', 4000) 
      }
      Materialize.toast('Privacy Toggled', 4000) 
    }
  }
  generateTweet(track) {
    return "Listen to" + track.title + "by " + this.props.currentUser.username;
  }
  render() {
      const options = {
        height: 80,
        cursorColor: '#0000',
        progressColor: '#546E7A',
        barWidth: 2,

        cursorWidth: 3,
        hideScrollbar: true
      }
      const cdnSource = {
        beatUrl: 'https://d2hbl0lksauo4z.cloudfront.net/Jahosh_R2Instrumental.mp3'
      }
    return (
     <div> 
       <li className="collection-item avatar track" key={this.props.song._id}>
         { this.state.loading ? <Blaze template="spinner" /> : '' }
         <div className="row">
         <div className="col s12 l3" id="track-info">
            <span className="trackTitle"><Link className="trackLink" to={ this.props.song.username + '/' + this.props.song.title}><p id="username-link" className="flow-text">{this.props.song.title}</p></Link></span>
            <Link className="track-link" to={this.props.song.username}><p className="songTitle">{this.props.song.username}</p></Link>
            <p>{this.props.song.fileName}</p>
            <span className="track-photo" ></span>
         </div>
         <div className="col s12 l9" id="track-wave">
          {this.state.playing ? 
            <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="60px" /> :
            <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="60px" /> 
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
         
          <div className="track-stats">
            <i className="tiny material-icons">play_arrow</i><span id="plays">{this.props.song.plays}</span> <br />
            <i className="tiny material-icons">star</i><span id="likes">{this.props.song.likedBy.length}</span> <br />
            <i className="tiny material-icons">playlist_add</i> <span className="" data-livestamp={this.props.song.createdAt}></span>
          </div>
           </div>
        </div>
        <div className="row">
          <div className="col s12" id="track-misc">
          
          <div className="beatActions">
            <span className="secondary-content">${this.props.song.price}</span>
            {/* 
              <a href="#!" onClick={this.likeSong.bind(this)} className="secondary-content"><i className="em em-pray"></i></a>   
              <div>
              <button className="delete" onClick={this.deleteSong.bind(this)}>
                &times;
              </button>
              </div>
            */}

            <a className="btn-flat btn-small disabled float-right songPrivacy" onClick={this.togglePrivate.bind(this)}>
              {this.props.song.private ? 'Private' : 'Public'}
            </a>
            <Link to={"/purchase/" + this.props.song._id }  className="btn-flat btn-small disabled" id="payment-tag">
              Purchase
            </Link>
             <Link className="btn-flat btn-small disabled twitter-share-button" href="#" id="share-tag">
              Share
            </Link>
            <Link  onClick={this.likeSong.bind(this)} className="btn-flat btn-small disabled" id="like-tag">
              Like
            </Link>
        </div>
        </div>
        </div>
        <hr />
      </li>      
    </div>
    );
  }
}

Track.propTypes = {
  song: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};