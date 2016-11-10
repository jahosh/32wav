import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//containers
import BeatsContainer from './BeatsContainer.jsx';

class SongContainer extends Component {
  componentDidMount() {
 
  }
  render() {
    return (
      <div>

          <BeatsContainer
            beats={this.props.userBeats}
            currentUser={this.props.currentUser}
          />  
      </div>
    );
  }
}

SongContainer.PropTypes = {
 userBeats: PropTypes.array.isRequired,
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks');
  const loading = !subscription.ready();
  const username = props.params.username;
  const track = props.params.track
  const userBeats = Tracks.find({username: username, title: track }).fetch();
  return {
   userBeats: userBeats,
   track: track,
  };
}, SongContainer);