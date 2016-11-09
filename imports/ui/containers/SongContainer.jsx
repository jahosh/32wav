import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Beats } from '../../api/beats/beats.js';

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
  const subscription = Meteor.subscribe('beats');
  const loading = !subscription.ready();
  const username = props.params.username;
  const track = props.params.track
  const userBeats = Beats.find({username: username, title: track }).fetch();
  return {
   userBeats: userBeats,
   track: track,
  };
}, SongContainer);