import React, { Component, PropTypes } from 'react';


//react components
import FileUpload from '../components/FileUpload.jsx';

export default class UploadContainer extends Component {
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