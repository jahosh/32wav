import React, { Component } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';


// import { updateTrack } from '../../../api/tracks/methods.js';
// import { toggleTrackDownloadStatus } from '../../../api/tracks/methods.js';

export default class EditTrack extends Component {
  componentDidMount() {
    if (this.props.downloadable) {
      $("#download-switch").prop("checked", true);
    }

  }
  changeDownloadStatus() {
    const track = {
      trackId: this.props.trackId,
      downloadState: !this.props.downloadable
    };

     Meteor.call('tracks.toggleTrackDownload', track, (err) => {
       if (err) {
         console.log(err);
       }

     });
  }
  handleEditSubmit(e) {
    e.preventDefault();
    let payload         = {},
        trackName       = $("#track-title").val();
        trackId = this.props.trackId;

        payload.trackname = trackName;
        payload.trackId = trackId;


        Meteor.call('tracks.update', payload, (err) => {
          if(err) {
            console.log(err);
          }
          
          Bert.alert({
            type: 'profile-updated',
            style: 'growl-top-right',
            title: 'track updated',
            message: '',
            icon: 'fa-user'
          });
        });
  }
  render() { 
    const BASE_URL = this.props.track.trackImage === './32wav.jpg' ? 'http://localhost:3000/' : '';
    return (
      <div className="row">
        <div className="center-align">
          <span className="track-photo" style={{ "background": 'url(' + BASE_URL + this.props.track.trackImage + ')'}} ></span>
        </div>
        <form className="col s12" onSubmit={this.handleEditSubmit.bind(this)}>
          <div className="input-field col s12">
            <input defaultValue={this.props.track.title} id="track-title" type="text" maxLength="30" className="validate" />
            <label className="active" htmlFor="track_title">Title:</label>
          </div>
        </form>
        <form>
          <p>
            <input type="checkbox" id="download-switch" onClick={this.changeDownloadStatus.bind(this)} />
            <label htmlFor="download-switch">Downloadable</label>
          </p>
        </form>
        </div>
    );
  }
}