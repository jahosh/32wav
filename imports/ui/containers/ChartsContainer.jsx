import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import { Beats } from '../../api/beats/beats.js';

//react components
import Charts from '../components/Charts.jsx';


class ChartsContainer extends Component {
  render() {
    return (
      
      <div>
      {this.props.loading ? <Blaze template="spinner" /> :
      <div className="row">
      <div className="col s12 m12 l10 offset-l1">
        <header className="background-header text-center" id="charts-header">
          <h1 className="center">Charts</h1>
        </header>
        <span className="small margin-left-15"><p className="flow-text center">Browse uploaded tracks</p></span>
        <div className="divider mrg-bottom-10"></div>
      </div>
        <Charts
          beats={this.props.beats}
          currentUser={this.props.currentUser} 
        />
      </div>
      }
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
  const beats = Beats.find({}, { sort: { createdAt: -1 } }).fetch();
  const currentUser = Meteor.user();
  return {
    beats: beats,
    savedBeats: Beats.find({ checked: { $ne: true } }).count(),
    currentUser: currentUser,
    loading: loading,
  };
}, ChartsContainer);