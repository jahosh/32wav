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
    //<p>Member Since: <br />{ this.props.user[0].createdAt ? `${this.props.user[0].createdAt}` : '' }</p>
    return (
      <div className="row">
        { this.props.loading ? <Blaze template="spinner" /> :
        <div>
          <div className="col l12  center-align mainProfile">
            <div className="col l10 offset-l1 s12" id="profile-header">
              <div className="col l2">
                <img className="responsive-img userPic" src="defaultAvatar.jpeg" />
                <br />
              </div>
              <div className="col l2" id="user-info">
                <div className="" id="profile-name">
                  <h3 className="center-align">
                  {this.props.params.username}
                  </h3>
                </div>
                 
              </div>
              <div className="col l4" id="">
                
              </div>
            </div>
              <div className="col l10 offset-l1 s12">
              <table className="centered">
                <thead>
                  <tr>
                    <th data-field="id">Orgin</th>
                    <th data-field="id">twitter</th>
                    <th data-field="id">Member Since:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Los Angeles, CA</td>
                    <td>
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                    </td>
                    <td>
                      { this.props.user[0].createdAt ? `${this.props.user[0].createdAt}` : '' }
                    </td>
                  </tr>
                </tbody>
              </table>  
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
