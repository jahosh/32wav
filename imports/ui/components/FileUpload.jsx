import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component';


//react components
import Uploader from './Uploader.jsx';

export default class Header extends Component {
  onDrop(files) {
    const upload = new Slingshot.Upload("uploadToAmazonS3");
   
    //grab user inputted title & file
    let title = document.getElementById("songTitle").value;
    let file = files[0];

  
    // give preview to audio player
    let previewSrc = file.preview;
    const audioPlayer = document.getElementById('preview');
    audioPlayer.src = previewSrc;

    //append song info into previewSpan
    document.getElementById("previewInfo").innerHTML = file.name;

    upload.send(file, function(err, source) {
    if (err) {
      console.error(err);
      alert(err);
      return;
    } 
    
    console.log('success');
    Meteor.call('beats.insert', title, source);
    });
  }
  render() {
    return (
      <div className="">
          <div>
            <form className="new-task" onSubmit={this.props.onHandleSubmitUpload.bind(this)} >
              <input 
                type="text"
                id="songTitle"
                ref="songTitle"
                placeholder="enter beat name"
              />
              <i className="small material-icons">input</i>
            </form>
      
            { /* React Uploader */}
            <Uploader
              onHandleDrop={this.onDrop.bind(this)} />

            { /* Song Preview */}
            <strong><span className="valign center" id="previewInfo"></span></strong>
            <br />
            <audio className="previewPlayer" controls id="preview"></audio>
          </div>
      </div>
    );
  }
}