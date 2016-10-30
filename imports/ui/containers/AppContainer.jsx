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
import Header from '../components/Header.jsx';
import Song from '../components/Song.jsx';
import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';
import Navbar from '../components/Navbar.jsx';
import FileUpload from '../components/FileUpload.jsx';
import Uploader from '../components/Uploader.jsx';
import Loader from '../components/Loader.jsx';
import App from '../components/App.jsx';


class AppContainer extends Component {
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
      <div className="row">
      {this.props.loading ? <Blaze template="spinner" /> : 
        <div>
          <Navbar />
          {this.props.children}
        </div>

      /*
        <div>
          <BeatsContainer
            beats={this.props.beats}
            currentUser={this.props.currentUser}
          />   
        </div>
        */
        
      }
      </div>
    );
  }
}

AppContainer.propTypes = {
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
}, AppContainer);


/*
export const App = ( {children} ) => (
  <div>
    <Navbar />
    {children}
  </div>
)

*/
