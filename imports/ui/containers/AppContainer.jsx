import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';

// mongo collection
import { Beats } from '../../api/beats/beats.js';

//react components
import Navbar from '../components/Navbar.jsx';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> : 
          <div>
            <Navbar />
            {this.props.children}
          </div>        
        }
      </div>
    );
  }
}

AppContainer.propTypes = {
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
}, AppContainer);

