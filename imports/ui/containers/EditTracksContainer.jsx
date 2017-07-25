import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Link } from 'react-router';

// mongo collection
import Tracks from '../../api/Tracks/Tracks';

//components
import EditTrack  from '../components/Edit/EditTrack.jsx';




class EditTracksContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.title = "All Uploads | 32wav ";
  }
  renderTrackLinks() {
    const tracks = this.props.userTracks;
    const userId = Meteor.user() ? Meteor.user()._id : '';

    return tracks.map( (track) => {
      return (
          <li className="collection-item avatar" key={track._id}>
          <div className="float-right">
          </div>
            <Link to={ 'edit/' + track._id} className="track-link"><p className="songTitle">{track.title}</p></Link>
          </li>
      );
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l10 offset-l1">
          { this.props.loading ? <Blaze template="spinner" /> : 
            <div>
              <h1> All Uploads </h1>
              <ul className="collection">
                { this.renderTrackLinks() }
              </ul>

            </div>
          }
        </div>
      </div>
    );
  }
}

export default createContainer( (props) => {
  const username = props.params.username;
  const subscription = Meteor.subscribe('Tracks.all.edit', username);
  const loading = !subscription.ready();
  const userTracks = Tracks.find({username: username }, { sort: { createdAt: -1 } }).fetch();
  console.log(userTracks);
  const user = Meteor.users.find({username: username }).fetch()
  return {
   userTracks: userTracks,
   username: username,
   loading: loading,
   user: user,

  };
}, EditTracksContainer);