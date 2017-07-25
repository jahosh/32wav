import React, { Component } from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { HTTP } from 'meteor/http';
// import { sendTrack } from '../../../imports/api/tracks/methods.js';

export class FileShare extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  send(e) {
    e.preventDefault();
    const file = $("#profile-pic-upload")[0].files[0];

    Meteor.call('tracks.sendTrack', 'test', (err) => {
      if (err) {
        console.log(err);
        return;
      }

      alert('sent successfully');
    });
  }
  render() {
    return (
      <div className="center-align">
        <h3 className="center-align">Encrypted Song Send</h3>
          <button onClick={this.send} className="btn waves-effect waves-light" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
           <form>
              <div className="file-field input-field">
                <div className="btn">
                  <span>File</span>
                  <input type="file" id="profile-pic-upload" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            </form>
      </div>
    );
  }
}
