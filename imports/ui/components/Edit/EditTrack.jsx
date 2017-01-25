import React, { Component } from 'react';


import { updateTrack } from '../../../api/tracks/methods.js';

export default class EditTrack extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
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
        <form className="col s12" onSubmit={this.handleEditSubmit.bind(this)}>
            <div className="center-align">
              <img  height="200" width="200" src={this.props.track.trackImage} />
            </div>
          <div className="input-field col s12">
          <div>
          </div>
            <input defaultValue={this.props.track.title} id="track-title" type="text" maxLength="30" className="validate" />
            <label className="active" htmlFor="track_title">Title:</label>
          </div>
        </form>


            <div className="switch">
              <label>
                Download enabled
              <input type="checkbox" />
              <span className="lever"></span>
                    On
              </label>
              </div>
      </div>
    );
  }
}