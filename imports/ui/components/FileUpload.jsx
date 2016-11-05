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
      iconFiletypes: ['.mp3'],
      showFiletypeIcon: true,
      postUrl: 'no-url',
    };

    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: false,

    };

    this.state = {
      progress: 0
    }
  

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
   componentDidMount() {
      console.log(this.state);
    }
  onDrop(files) {
    let title = document.getElementById("songTitle").value;
    if (title === '') {
      alert('please enter a title');
      return;
    }

    console.log(files);
   

    // must get preview from files
    const upload = new Slingshot.Upload("uploadToAmazonS3");
   
    //grab user inputted title & file
   
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
      computation.stop();
    if (err) {
      this.setState({ progress: 0 });
      console.error(err);
      alert(err);
      return;
    }
    console.log('success');
    Meteor.call('beats.insert', title, source);
    });


    let computation = Tracker.autorun( () => {
      const self = this
      if (!isNaN(upload.progress())) {
        self.setState({ progress: upload.progress() * 100 });
      }
      console.log(this.state)
    })
   
  }
  render() {
    const eventHandlers = {
      addedfile: this.onDrop.bind(this),
    }

    const uploadStyle = {
      width: Math.round(this.state.progress) + '%'
    }

    return (
      <div className="row">
      <div className="uploadUI">
            <form className="new-task" onSubmit={this.props.onHandleSubmitUpload.bind(this)} >
              <label htmlFor="beat name">Title</label>
              <input 
                type="text"
                id="songTitle"
                ref="songTitle"
                placeholder="enter beat name"
              />
               <input 
                type="text"
                id="beatPrice"
                ref="beatPrice"
                placeholder="$ USD"
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
            <strong><span className="center-align" id="previewInfo">Beat:</span></strong>
            <br />
          
            <br />
            <p className="flow-text center-align">Progress: {uploadStyle.width}</p>
             <div className="progress">
              <div className="determinate" style={uploadStyle}></div>
            </div>
            <div id="uploadSubmit">
            <button onClick={this.onDrop.bind(this)} className="btn waves-effect waves-light blue-grey darken-1 center-align" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
            </div>
            </div>
           
      </div>
    );
  }
}