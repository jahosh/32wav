import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// mongo collection
import { Beats } from '../../api/beats/beats.js';

//react components
import Charts from '../components/Charts.jsx';


class ChartsContainer extends Component {
  render() {
    return (
      <div>
        <Charts
          beats={this.props.beats}
          currentUser={this.props.currentUser} 
        />
      </div>
    );
  }
}

ChartsContainer.propTypes = {
  beats: PropTypes.array.isRequired,
  savedBeats: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

export default createContainer( () => {
  const subscription = Meteor.subscribe('beats');
  const loading = !subscription.ready();
  const beats = Beats.find({}, { limit: 3, sort: { createdAt: -1 } }).fetch();
  const currentUser = Meteor.user();
  return {
    beats: beats,
    savedBeats: Beats.find({ checked: { $ne: true } }).count(),
    currentUser: currentUser,
    loading: loading,
  };
}, ChartsContainer);