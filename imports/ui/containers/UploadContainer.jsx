import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';


//react components
import FileUpload from '../components/FileUpload.jsx';

class UploadContainer extends Component {
  render() {
    return (
      <div className="row">
        
        <div className="">
          { this.props.currentUser ? 
            <div>
              <div className="col s12 m12  l10 offset-l1">
                <header className="background-header text-center" id="upload-header">
                  <h1 className="center">Upload</h1>
                </header>
              </div>
            <div className="col s12 m10 offset-m1 l8 offset-l2 uploadOuter">
            
            <FileUpload
              currentUser={this.props.currentUser}
            /> 
            </div>
            </div> : <div> <p className="flow-text center"> Please log in to upload</p></div>           
          }
        </div>
      </div>
    );
  }
}

export default createContainer( (props) => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, UploadContainer);
