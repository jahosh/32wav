import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Blaze from 'meteor/gadicc:blaze-react-component';
import DropzoneComponent from 'react-dropzone-component';
import { Router, browserHistory } from 'react-router';
import { default as swal } from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.min.css';

//methods
import { insertTrack } from '../../api/tracks/methods.js';

import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

//react components
import Uploader from './Uploader.jsx';

const template = ReactDOMServer.renderToStaticMarkup(
  <div className="dz-preview dz-file-preview card">
    <div className="dz-filename">
      <span data-dz-name></span>
    </div>
    <i className="material-icons">present_to_all</i>
              
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
      showFiletypeIcon: false,
      postUrl: 'no-url',
    };
    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: false,
      previewTemplate: template,
      acceptedFiles: "audio/mp3, audio/mpeg, audio/wav, audio/m4a",
    };
    this.state = {
      progress: 0,
      uploadComplete: false
    }
  }
componentDidMount() {
  this.initMaterialize();
  this.hideUploadElements();
  $("#visability").click(function() {
      let licenseType = $("#visablity").prop('checked');
      let privateStatus = $("#private").prop('checked');
  })
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
displayFileUploaded() {
  swal({
  title: '<p class="flow-text">File Uploaded</p>',
  type: 'info',
  timer: 5000,
  html:
    'You can use <b>bold text</b>, ' +
    '<a href="//github.com">links</a> ' +
    'and other HTML tags',
  showCloseButton: true,
  showCancelButton: true,
  confirmButtonText:
    '<i class="fa fa-thumbs-up"></i> Great!',
  cancelButtonText:
    '<i class="fa fa-thumbs-down"></i>'
  }).then(function() {
    browserHistory.push('/browse');
  })
  
}
onDrop(file) {
  const self = this;
  const fileKey = file.name;
  self.displayUploadElements();

  const upload = new Slingshot.Upload("uploadToAmazonS3");
    upload.send(file, function(err, source) {
      computation.stop();
      if (err) {
        this.setState({ progress: 0 });
        console.error(err);
        alert(err);
        return;
      }
      self.displayUploadStatus();

      $("#track-data").submit(function(e){
        e.preventDefault();
        self.saveTrack(source, fileKey)
      });
  });
  let computation = Tracker.autorun( () => {
    const self = this
    if (!isNaN(upload.progress())) {
      self.setState({ progress: upload.progress() * 100 });
    }
  }); 
}
saveTrack(source, fileKey) {
  let title             = $("#beatTitle").val()
  let price             = $("#beatPrice").val();
  let genre             = $("#beat-genre option:selected").val();
  let description       = $("#track-desc").val()
  let privateSelect     = $("#private").prop("checked");
  let publicSelect      = $("#public").prop("checked");
  let visability        = privateSelect ? true : false;
  let licenseType       = $("#track-license option:selected").val();

  if (title === '') {
    alert('please enter a title');
  return;
  }
  let track = {
    title: title,
    price: parseInt(price),
    genre: genre,
    licenseType: licenseType,
    description: description,
    fileSource: source,
    fileKey: fileKey,
    setPrivate: visability
  }
  insertTrack.call(track, (err) => {
    if (err) {
      alert (err.reason);
    }
      this.displayFileUploaded();
  });
}
handleSubmit(e) {
  e.preventDefault();
}
render() {
  const self = this;
  const eventHandlers = {
    init: function(dropzone) {
      dropzone.options.dictDefaultMessage = "Click here to upload";
      dropzone.on("addedfile", function(file) {
       self.onDrop(file);
      });
    },
  }
  const uploadStyle = {
    width: Math.round(this.state.progress) + '%'
  } 
  return (
      <div className="row">
         <DropzoneComponent
              config={this.config}
              eventHandlers={eventHandlers}
              djsConfig={this.djsConfig}
            />

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
        <div className="uploadUI">
          <form className="new-task col s12" id="track-data" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s6">
               
                <input 
                  type="text"
                  id="beatTitle"
                  ref="beatTitle"
                />
                <label htmlFor="beatname">Title</label>
              </div>
              <div className="input-field col s6">
               
                <input 
                  type="number"
                  id="beatPrice"
                  ref="beatPrice"
                  min="1"
                />
                <label htmlFor="beatprice">Price (USD)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <select id="track-license">
                  <option defaultValue="">Select a license</option>
                  <option value="lease">Lease</option>
                  <option value="exclusive">Exclusive</option>
                </select>
                <label>License</label>
              </div>
              <div className="input-field col s6">
                <select id="beat-genre">
                  <option defaultValue="">Select a genre</option>
                  <option value="hiphop">Hip-Hop</option>
                  <option value="electronic">Electronic</option>
                  <option value="indie">Indie</option>
                </select>
                <label>Genre</label>
              </div>
            </div>
            <div className="row">
            <div className="radio col s6" id="visability">
                <p>
                  <input name="public-private" type="radio" value="public" id="public" />
                  <label htmlFor="public">Public</label>
                </p>
                <p>
                  <input name="public-private" type="radio" value="private" id="private" />
                  <label htmlFor="private">Private</label>
                </p>
              </div>
              <div className="input-field  col s6">
                <textarea id="track-desc" className="materialize-textarea"></textarea>
                <label htmlFor="textarea1">Description</label>
              </div>
            </div>
             <div id="uploadSubmit">
            <button id="uploadBtn" className="btn waves-effect waves-light blue-grey darken-1 center-align" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
            <div className="tos">
              <p className="small center-align">By uploading you agree to our <a href="#modal1">terms of service</a> & also agree to own the copyright to the instrumental / song your uploading</p>
            </div>
          </div>
          </form>
          <div id="divider"> </div>
          <div>-</div>
          <div id="modal1" className="modal bottom-sheet">
            <div className="modal-content">
              <h4>Modal Header</h4>
              <p>A bunch of text</p>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}