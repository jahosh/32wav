import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


//react components
import FileUpload from '../components/FileUpload.jsx';

class UploadContainer extends Component {
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
      <div>
     { this.props.currentUser ? 
            <FileUpload
              currentUser={this.props.currentUser}
              onHandleSubmitUpload={this.handleSubmitUpload}
            /> : '' 
          }
        </div>
    );
  }
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, UploadContainer);