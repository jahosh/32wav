import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//containers
import TracksContainer from './TracksContainer.jsx';

class ProfileContainer extends Component {
  componentDidMount() {
 
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> :
        <div>
        <h1 className="center-align">
          {this.props.params.username}'s Profile
        </h1>

          <TracksContainer
            tracks={this.props.userTracks}
            currentUser={this.props.currentUser}
          />  
          </div> 
        }
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
 userBeats: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const username = props.params.username;
  const subscription = Meteor.subscribe('Tracks.all');
  const loading = !subscription.ready();
  
  const userTracks = Tracks.find({username: username }, { limit: 3, sort: { createdAt: -1 } }).fetch();
  
  return {
   userTracks: userTracks,
  };
}, ProfileContainer);
