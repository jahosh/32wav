import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Link } from 'react-router';

import TracksList from '../components/TracksList.jsx';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';
import Track from '../components/Track.jsx';

class SearchContainer extends Component {
  renderSongs() {
      const tracks      = this.props.tracks;
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
  renderUsers() {
    const users = this.props.users;
    const foundUsers = users.filter( (user) => {
      if (user._id === Meteor.user()._id) {
        return
      }
      return user;
    });
    return foundUsers.map( (user) => {
      return (
        <div>
          <li className="collection-item avatar track" key={user._id}>
            <img src={user.profile_img} alt="" className="circle" />
            <Link to={user.username}><span className="title">{user.username}</span></Link>
          </li>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="row">
       <div className="col l10 offset-l1">
        { this.props.loading ? <Blaze template="spinner" /> :
          <div>
            <div className="center-align">
              search results found: { this.props.tracks.length } <br />
              users found: {this.props.users.length - 1 }  
            </div> 
            <ul className="collection">
              { this.renderUsers() }
            </ul>
          
            <TracksList
              handleRenderTracks={this.renderSongs.bind(this)}
            />
          </div> 
        }
        </div>
      </div>
    );
  }
}

export default createContainer( (props) => {
  const search = props.params.term;
  const subscription = Meteor.subscribe('Tracks.search', search);
  const loading = !subscription.ready();
  const tracks = Tracks.find({}).fetch();
  const users = Meteor.users.find({}).fetch();
  console.log(users)
  //const track = Tracks.findOne({ _id: trackId });
  //const owner = track ? track.owner : {};
  //const seller = Meteor.users.findOne(owner);
  return {
   loading: loading,
   tracks: tracks,
   users: users,
  };
}, SearchContainer);