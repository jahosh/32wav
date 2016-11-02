import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Beats } from '../../api/beats/beats.js';

//containers
import BeatsContainer from './BeatsContainer.jsx';

class ProfileContainer extends Component {
  componentDidMount() {
 
  }
  render() {
    return (
      <div>
        <h1 className="center-align">
          {this.props.params.username}'s Profile
        </h1>

          <BeatsContainer
            beats={this.props.userBeats}
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
  const subscription = Meteor.subscribe('beats');
  const loading = !subscription.ready();
  const username = props.params.username;
  const userBeats = Beats.find({username: username }, { limit: 3, sort: { createdAt: -1 } }).fetch();
  
  return {
   userBeats: userBeats,
  };
}, ProfileContainer);
