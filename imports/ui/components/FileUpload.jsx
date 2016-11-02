import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Blaze from 'meteor/gadicc:blaze-react-component';
import DropzoneComponent from 'react-dropzone-component';


import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
//react components
import Uploader from './Uploader.jsx';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.config = {
      iconFiletypes: ['.mp3', '.jpg'],
      showFiletypeIcon: true,
      postUrl: 'no-url'
    };

    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: false,

    };

/*
    this.eventHandlers = {
      init: function (Dropzone) { 
        
        let files = Dropzone.getQueuedFiles();

        console.log(files);

      },
      drop: function() {
        console.log('dropped');
      },

      complete: function() {
        console.log('done');
      },

      addedfile: (file) => console.log(file)
    };
    */
  }
  onDrop(files) {

    console.log(files);
    return;

    // must get preview from files
    const upload = new Slingshot.Upload("uploadToAmazonS3");
   
    //grab user inputted title & file
    let title = document.getElementById("songTitle").value;
    let file = files;

  
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

    const eventHandlers = {
      addedfile: this.onDrop.bind(this),
      drop: (event) => console.log(event),
      thumbnail: (file) => console.log(file)
    }

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
      
         
            <Uploader
              onHandleDrop={this.onDrop.bind(this)} />
              
            <DropzoneComponent
              config={this.config}
              eventHandlers={eventHandlers}
              djsConfig={this.djsConfig}
            />

            { /* Song Preview */}
            <strong><span className="valign center" id="previewInfo"></span></strong>
            <br />
            <audio className="previewPlayer" controls id="preview"></audio>
          </div>
      </div>
    );
  }
}