import React, { Component } from 'react';


import { updateTrack } from '../../../api/tracks/methods.js';
import { toggleTrackDownloadStatus } from '../../../api/tracks/methods.js';

export default class EditTrack extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    console.log(this.props);
    console.log($("#download-switch").is(":checked"));
    if (this.props.downloadable) {
      $("#download-switch").prop("checked", true);
    }

  }
  changeDownloadStatus() {
    console.log(this.props);

    let payload = {
      trackId: this.props.trackId,
      downloadState: !this.props.downloadable
    };

     toggleTrackDownloadStatus.call(payload, (err) => {
       if (err) {
         console.log(err);
       }
     });

    console.log($("#download-switch").is(":checked"));
  }
  handleEditSubmit(e) {
    e.preventDefault();
    let payload         = {},
        trackName       = $("#track-title").val();
        trackId = this.props.trackId;

        payload.trackName = trackName;
        payload.trackId = trackId;


        updateTrack.call(payload, (err) => {
          if(err) {
            console.log(err);
          }
        });
    
  }
  render() { 
    return (
      <div className="row">
        <div className="center-align">
          <span className="track-photo" style={{"background": 'url(' + this.props.track.trackImage + ')'}} ></span>
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