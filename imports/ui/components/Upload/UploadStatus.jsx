import React from 'react';

export const UploadStatus = (props) => {
  return (
    <div>
    <div className="progress-result-success">
      <p className="center-align"> Success! </p>
      <i className="fa fa-check center-align" aria-hidden="true"></i>
    </div>
    <div className="progress">
      <div className="determinate" style={ {"width": props.uploadProgress }}></div>
    </div>
       <div className="progress-status">
      <p className="flow-text center-align">Progress: {props.uploadProgress}</p>
    </div>
    </div>
  );
}