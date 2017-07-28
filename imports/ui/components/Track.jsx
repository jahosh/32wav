import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Session } from 'meteor/session';
import Wavesurfer from 'react-wavesurfer';
import { Link } from 'react-router';
import _ from 'lodash';
import { default as swal } from 'sweetalert2';
import { Spinner } from './Spinner.jsx';

//collections
import { Tracks } from '../../api/Tracks/Tracks';

//methods
// import { removeTrack } from '../../api/tracks/methods.js';
// import { likeTrack } from '../../api/tracks/methods.js'; 
// import { incrementTrackPlayCount } from '../../api/tracks/methods.js';
// import { setTrackPrivate } from '../../api/tracks/methods.js';

export default class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: true,
      played: false,
      loading: true,
      pos: 0
    };
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handlePosChange = this.handlePosChange.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }
  componentDidMount() {

  }
  handleTogglePlay() {
    this.props.globalPlaying(this.props.song._id);
    this.setState({ playing: !this.state.playing, played: true });

    // if the track is playing, and has never been played, incre playcount.
    if (this.state.playing && this.state.played === false) {
    Meteor.call('tracks.incrementPlayCount', { trackId: this.props.song._id}, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('success!');
    });
  }
  }
  handlePosChange(e) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  likeSong() {
    let selectedBeat = this.props.song._id;

    if (!Meteor.userId()) {
      alert('must be logged in to like tracks');
      return;
    }

    Meteor.call('tracks.like', { trackId: selectedBeat }, (err) => {
      if (err) {

        Bert.timer = 5;
        Bert.alert(err.reason, 'danger', 'fixed-top');
      }
      Materialize.toast('Beat Liked!', 4000) 
    });
  }
  handleReady() {  
    $(".spinner").hide();
    this.setState({
      loading: false,
      ready: true,
    });
  }
  deleteSong() {
    const trackId = this.props.song._id;
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
        Meteor.call('tracks.remove', { trackId: trackId }, (err) => {
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
    Meteor.call('tracks.setPrivate', { trackId: this.props.song._id, setPrivate: !this.props.song.setPrivate }, (err) => {
      if (err) {
        Materialize.toast('Unauthorized', 4000) 
      }
      Materialize.toast('Privacy Toggled', 4000) 
    });
  }
  generateTweet(track) {
    return "Listen to" + track.title + "by " + this.props.currentUser.username;
  }
  handlePlay(ws) {
    const self = this;
    if (this.props.globalState.track != this.props.song._id) {
      ws.wavesurfer.pause();
      this.setState({ playing: !this.state.playing });
    }
  }
  cantDownload() {
    alert('downloads are disabled for this track');
  }
  render() {
      const options = {
        height: 80,
        cursorColor: '#0000',
        progressColor: '#212121',
        barWidth: 2,
        cursorWidth: 3,
        hideScrollbar: true
      }
      const cdnSource = {
        beatUrl: 'https://s3-us-west-1.amazonaws.com/jahosh-meteor-files-resized/images/XFmorHpADjjtpw69Mia.jpg'
      }
      const userId = Meteor.user() ? Meteor.user()._id : '';
    return (
     <div> 
       <li className="collection-item avatar track" key={this.props.song._id}>

         <div className="row">
         <div className="col s12 l3" id="track-info">
            <span className="trackTitle"><Link className="trackLink" to={ this.props.song.userSlug + '/' + this.props.song.slug}><p id="track-link" className="flow-text">{this.props.song.title}</p></Link></span>
            <Link className="track-link" to={this.props.song.userSlug}><p id="username-link">{this.props.song.username}</p></Link>
            <p>{this.props.song.fileName}</p>
            <span className="track-photo" style={{"background": 'url(' + this.props.song.trackImage + ')'}} ></span>
          
         </div>
         <div className="col s12 l9" id="track-wave">
          {!this.state.playing ? 
            <img src="/assets/pause.svg" className="playPause" onClick={this.handleTogglePlay} height="60px" /> :
            <img src="/assets/play.svg" className="playPause" onClick={this.handleTogglePlay} height="60px" /> 
          }      
       
          {this.state.played ? 
            <div>
            <div className="spinner">
              <Spinner />
            </div>
            <Wavesurfer
              audioFile={this.props.source}
              options={options}
              onAudioprocess={this.handlePlay}
              pos={this.state.pos}
              onReady={this.handleReady}
              onPosChange={this.handlePosChange}
              playing={!this.state.playing}
              />
          </div>
          : <div className="wave-spaceholder"></div> }
        
          <div className="track-stats">
            <i className="small material-icons">play_arrow</i><span id="plays">{this.props.song.plays}</span> <br />
            <i className="small material-icons">star</i><span id="likes">{this.props.song.likes}</span> <br />
            <i className="small material-icons">playlist_add</i> <span id="time" data-livestamp={this.props.song.createdAt}></span>
          </div>
           </div>
        </div>
        <div className="row">
          <div className="col s12" id="track-misc">  
          <hr id="track-misc-line" />     
          <div className="beatActions">
            
            {/* - old purchase functionality - price-tags
            <Link to={ "/purchase/" + this.props.song._id }><span className="secondary-content">${this.props.song.price}</span></Link>
            */}
  
            {/* 
              <a href="#!" onClick={this.likeSong.bind(this)} className="secondary-content"><i className="em em-pray"></i></a>   
              <div>
              <button className="delete" onClick={this.deleteSong.bind(this)}>
                &times;
              </button>
              </div>
            */}
            { this.props.song.owner === userId ? 
              <div>
                <Link to={ "edit/" + this.props.song._id } id="track-buttons" className="btn-flat btn-small disabled float-right">
                  Edit
                </Link>
                <a className="btn-flat btn-small disabled float-right" id="track-buttons" onClick={this.deleteSong.bind(this)}>
                  Delete 
                </a>
                <a className="btn-flat btn-small disabled float-right songPrivacy" id="track-buttons" onClick={this.togglePrivate.bind(this)}>
                  {this.props.song.setPrivate ? 'Private' : 'Public'}
                </a>
              </div>
            : ''}

          
            { Meteor.user() !== null && this.props.song.download ?  
            <a href={this.props.source} download="file.mp3"  className="btn-flat btn-small disabled" id="payment-tag">
              Download
            </a>
            : <a className="btn-flat btn-small disabled" onClick={this.cantDownload} id="payment-tag">
            Download
            </a>
      
            }
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
