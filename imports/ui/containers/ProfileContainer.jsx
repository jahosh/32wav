import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';


class ProfileContainer extends Component {
  componentDidMount() {
  console.log(this.props);

  }
  renderSong() {
    console.log(this.props);
      const tracks      = this.props.userTracks;
      const currentUser = this.props.currentUser;
     return tracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
        return (
          <Track 
            key={track._id} 
            song={track}
            source={track.fileSource}
            showPrivateButton={showPrivateButton}
            currentUser={currentUser}
          />
        );
     });
  }
  render() {
    return (
      <div className="row">
        { this.props.loading ? <Blaze template="spinner" /> :
        <div>
          <div className="col l12  center-align mainProfile">
            <div id="profile-name">
              <h4 className="center-align">
                {this.props.params.username}
              </h4>
            </div>
             <p>Member Since: <br />{ this.props.user[0].createdAt ? `${this.props.user[0].createdAt}` : '' }</p>
            <div className="center-align">
              <img className="responsive-img userPic" src="defaultAvatar.jpeg" />
              <br />
              <div className="col l8 offset-l2">
              <a className="btn disabled profileContact">Contact</a> 
              <a className="btn disabled profileContact">Follow</a> 
              <table className="centered">
                <thead>
                  <tr>
                    <th data-field="id">Location</th>
                    <th data-field="name">Total Tracks</th>
                    <th data-field="price">Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Alvin</td>
                    <td>Eclair</td>
                    <td>$0.87</td>
                  </tr>
                </tbody>
              </table> 
              </div>  
              <br />
            </div>
          </div>
          <div className="col s12 m12 l10 offset-l1">
            <TracksList
              handleRenderTracks={this.renderSong.bind(this)}
            /> 
          </div>
        </div> 
        } 
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
 userTracks: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const username = props.params.username;
  console.log(username);
  const subscription = Meteor.subscribe('users.info', username);
  const loading = !subscription.ready();
  const userTracks = Tracks.find({username: username }, { sort: { createdAt: -1 } }).fetch();
  const user = Meteor.users.find({username: username }).fetch()
  console.log(user);
  return {
   userTracks: userTracks,
   username: username,
   loading: loading,
   user: user,

  };
}, ProfileContainer);
