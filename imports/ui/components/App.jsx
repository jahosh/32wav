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

//react components
import Header from './Header.jsx';
import Song from './Song.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Navbar from './Navbar.jsx';
import FileUpload from './FileUpload.jsx';
import Uploader from './Uploader.jsx';
import Loader from './Loader.jsx';


//template helpers
import Upload from '../../photoupload.js';

class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {

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
  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
  render() {
    return (
      <div className="row">

      {this.props.loading ? <Blaze template="spinner" /> : 
        <div>
          <Navbar
            user={this.props.currentUser} 
          />

          <BeatsContainer
            beats={this.props.beats}
            currentUser={this.props.currentUser}
          />

          { this.props.currentUser ? 
            <FileUpload
              currentUser={this.props.currentUser}
              onHandleSubmitUpload={this.handleSubmitUpload}
            /> : '' 
          }
        </div>
      }
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