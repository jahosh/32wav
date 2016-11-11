import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//containers
import TracksContainer from './TracksContainer.jsx';

class ProfileContainer extends Component {
  componentDidMount() {
 
  }
  render() {
    return (
      <div>
        <h1 className="center-align">
          {this.props.params.username}'s Profile
        </h1>

          <TracksContainer
            beats={this.props.userTracks}
            currentUser={this.props.currentUser}
          />  
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
 userBeats: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks');
  const loading = !subscription.ready();
  const username = props.params.username;
  const userTracks = Tracks.find({username: username }, { limit: 3, sort: { createdAt: -1 } }).fetch();
  
  return {
   userTracks: userTracks,
  };
}, ProfileContainer);
