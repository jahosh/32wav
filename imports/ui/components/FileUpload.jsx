import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Blaze from 'meteor/gadicc:blaze-react-component';
import DropzoneComponent from 'react-dropzone-component';


import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';


//react components
import Uploader from './Uploader.jsx';

const template = ReactDOMServer.renderToStaticMarkup(
      <div className="dz-preview dz-file-preview">
        
          <div className="dz-filename "><span data-dz-name></span></div>
          <div className="dz-size" data-dz-size></div>
          <div className="dz-details">
            <img data-dz-thumbnail />
        </div>
        <div className="dz-success-mark"><span>✔</span></div>
        <div className="dz-error-mark"><span>✘</span></div>
        <div className="dz-error-message"><span data-dz-errormessage></span></div>
      </div>
      );

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
      previewTemplate: template

    };
    this.state = {
      progress: 0,
      uploadComplete: false
    }
  }
componentDidMount() {
  this.initMaterialize();
  this.hideUploadElements();
}
initMaterialize() {
  $(document).ready(function() {
    $('select').material_select();
  });
}
hideUploadElements() {
  $(".progress").hide();
  $(".progress-status").hide();
  $(".progress-result-success").hide();
}
displayUploadElements() {
  $(".progress").fadeIn();
  $(".progress-status").fadeIn();
}
displayUploadStatus() {
  $(".progress-result-success").fadeIn();
}
onDrop(e) {
  e.preventDefault();

  let file = ReactDOM.findDOMNode(this.refs.textInput).value;
  console.log(file);

  return;

  let title = ReactDOM.findDOMNode(this.refs.songTitle).value.trim();

  /// note for tonight -- figure out how to grab file from dropzone, so that you can submit it with this onClick

  if (title === '') {
    alert('please enter a title');
    return;
  }

  const upload = new Slingshot.Upload("uploadToAmazonS3");
    this.displayUploadElements();
    const self = this
    upload.send(file, function(err, source) {
      computation.stop();
      if (err) {
        this.setState({ progress: 0 });
        console.error(err);
        alert(err);
        return;
      }
    Meteor.call('beats.insert', title, source, (err) => {
      if (err) {
        console.log(err);
      }
      self.displayUploadStatus();
    });
  });

  let computation = Tracker.autorun( () => {
    const self = this
    if (!isNaN(upload.progress())) {
      self.setState({ progress: upload.progress() * 100 });
    }
  }); 
}
render() {
  const eventHandlers = {
    addedFile: () => console.log('added')
  }
  const uploadStyle = {
    width: Math.round(this.state.progress) + '%'
  }
  
  return (
      <div className="row">

        {/*
         <DropzoneComponent
              config={this.config}
              eventHandlers={eventHandlers}
              djsConfig={this.djsConfig}
            />
            */}

        <div className="uploadUI">
          <form className="new-task col s12 " onSubmit={this.onDrop}>
          <div className="file-field input-field">
            <div className="btn">
            <span>Select Track</span>
            <input 
              type="file"
              id="fileupload"
              ref="textInput"
            />
          </div>
          <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
          </div>
          </div>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">queue_music</i>
                <input 
                  type="text"
                  id="icon_prefix"
                  ref="songTitle"
                />
                <label htmlFor="beatname">Title</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">credit_card</i>
                <input 
                  type="number"
                  id="beatPrice"
                  ref="beatPrice"
                  min="1"
                />
                <label htmlFor="beatprice">Price</label>
              </div>
            </div>
            <div className="row">
              <div className="radio col s6">
                <p>
                  <input name="group1" type="radio" id="test1" />
                  <label htmlFor="test1">Public</label>
                </p>
                <p>
                  <input name="group1" type="radio" id="test2" />
                  <label htmlFor="test2">Private</label>
                </p>
              </div>
              <div className="input-field col s6">
                <select>
                  <option defaultValue="">Choose your option</option>
                  <option value="1">Hip-Hop/Rap</option>
                  <option value="2">Acoustic</option>
                  <option value="3">Acapella</option>
                </select>
                <label>Genre</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea id="textarea1" className="materialize-textarea"></textarea>
                <label htmlFor="textarea1">Description</label>
              </div>
            </div>
             <div id="uploadSubmit">
      
            <button id="uploadBtn" className="btn waves-effect waves-light blue-grey darken-1 center-align" type="submit" name="action">Upload
              <i className="material-icons right">send</i>
            </button>
            <div className="tos">
              <p className="small center-align">By uploading you agree to our <a href="#">terms of service</a> & also agree to own the copyright to the song your uploading</p>
            </div>
          </div>
          </form>
          <div id="divider"> </div>
          <div>-</div>
          <div className="progress-status">
            <p className="flow-text center-align">Progress: {uploadStyle.width}</p>
          </div>
          <div className="progress-result-success">
            <p className="center-align"> Success! </p>
            <i className="fa fa-check center-align" aria-hidden="true"></i>
          </div>
          <div className="progress">
            <div className="determinate" style={uploadStyle}></div>
          </div>
        </div>     
      </div>
    );
  }
}