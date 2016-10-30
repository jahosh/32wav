import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';

// mongo collection
import { Beats } from '../../api/beats/beats.js';
import { Mp3s } from '../../api/beats/mp3s.js';

//react containers
import BeatsContainer from '../containers/BeatsContainer.jsx';



//template helpers
import Upload from '../../photoupload.js';

class App extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmitUpload(event) {
    event.preventDefault();

    const files = ReactDOM.findDOMNode(this.refs.songlink).files[0];

     if (files !== undefined) {
      //alert('please select a file');
      const file  = ReactDOM.findDOMNode(this.refs.songlink).files[0].name;
    }

    const title = ReactDOM.findDOMNode(this.refs.songTitle).value.trim();
    
    Meteor.call('songs.insert', title, file);
    
    ReactDOM.findDOMNode(this.refs.songTitle).value = '';
    ReactDOM.findDOMNode(this.refs.songlink).value = '';
  }
  render() {
    return (
      <div className="col s12 m8 l9 offset-l2">
        <div className="card-panel center" id="logo">
          <h1 className="center-align">32wav.com</h1>
          <img src="./phlogo.png" height="150px" />
          <p className="flow-text center-align">Highest Quality Tracks</p>
        </div>
        <div className="divider"></div>
        <div className="divider"></div>
        <div className="headerImg">
        <header className="background-header text-center" id="welcome-header">
          <h1 className="center">Welcome to 32wav</h1>
        </header>
        <p className="flow-text center"><i className="em em-fire"></i>Popular</p>
      </div>
          <BeatsContainer
            beats={this.props.beats}
            currentUser={this.props.currentUser}
          />   
        </div>
    );
  }
}

App.propTypes = {
  beats: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  const subscription = Meteor.subscribe('beats');
  const loading = !subscription.ready();
  const beats = Beats.find({}, { limit: 3, sort: { createdAt: -1 } }).fetch();
  const currentUser = Meteor.user();
  return {
    beats: beats,
    incompleteCount: Beats.find({ checked: { $ne: true } }).count(),
    currentUser: currentUser,
    loading: loading,
  };
}, App);