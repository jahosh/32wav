import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//components
import EditTrack  from '../components/Edit/EditTrack.jsx';




class EditTrackContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.title = "Edit | 32wav ";
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l10 offset-l1">
          { this.props.loading ? <Blaze template="spinner" /> : 
            <div> 
              <header className="">
                <div className="center-align">
                  <h1 className="center-align">{ this.props.track.title } </h1>
                </div>
              </header>
              <EditTrack
              track={this.props.track}
              trackId={this.props.trackId}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default createContainer( (props) => {
  const trackId = props.params.trackId;
  const subscription = Meteor.subscribe('Tracks.edit', trackId);
  const loading = !subscription.ready();
  const track = Tracks.findOne({ _id: trackId });
  const currentUser = Meteor.user();
  return {
    track: track,
    currentUser: currentUser,
    loading: loading,
    trackId: trackId,
  };
}, EditTrackContainer);