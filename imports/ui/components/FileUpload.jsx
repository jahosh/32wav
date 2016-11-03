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
      postUrl: 'no-url',
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
   

    // must get preview from files
    const upload = new Slingshot.Upload("uploadToAmazonS3");
   
    //grab user inputted title & file
    let title = document.getElementById("songTitle").value;
    if (title === '') {
      alert('please enter a title');
      return;
    }
    let file = files;

    /*
    // give preview to audio player
    let previewSrc = file.preview;
    const audioPlayer = document.getElementById('preview');
    audioPlayer.src = previewSrc;


    //append song info into previewSpan
    document.getElementById("previewInfo").innerHTML = file.name;

        */

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
      thumbnail: (file, url) => console.log(file, url)
    }

    return (
      <div className="row">

            <form className="new-task" onSubmit={this.props.onHandleSubmitUpload.bind(this)} >
           
              <input 
                type="text"
                id="songTitle"
                ref="songTitle"
                placeholder="enter beat name"
              />
              <i className="small material-icons">input</i>
            </form>
 
           
      
            {/* 
            <Uploader
              onHandleDrop={this.onDrop.bind(this)} />
              */}
            <div> 
            <DropzoneComponent
              config={this.config}
              eventHandlers={eventHandlers}
              djsConfig={this.djsConfig}
            />
            </div>

            { /* Song Preview */}
            <strong><span className="valign center" id="previewInfo"></span></strong>
            <br />
            <audio className="previewPlayer" controls id="preview"></audio>
          
            <br />
            <button className="btn waves-effect waves-light blue-grey darken-1" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
           
      </div>
    );
  }
}