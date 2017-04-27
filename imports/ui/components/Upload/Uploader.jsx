import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';


export default class Uploader extends Component {
  render() {
    return (
      <div className="valign center">
        <Dropzone className="uploader valign center" onDrop={this.props.onHandleDrop}>
          <div> Upload Beats here </div>
        </Dropzone>
      </div>
    )
  }
}

