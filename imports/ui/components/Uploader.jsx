import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';



export default class Uploader extends Component {
  
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

    } else {
      console.log('success');
      //Meteor.subscribe('mp3Details');
      Meteor.call('songs.insert', title, source);
      console.log(source);
    }
  });
  }
  render() {
    return (
      <div className="valign center">
        <Dropzone className="uploader valign center" onDrop={this.onDrop}>
          <div> Upload Beats here </div>
        </Dropzone>
      </div>
    )
  }
}