import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Router, browserHistory } from 'react-router';
import { default as swal } from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.min.css';

//methods
import { insertTrack } from '../../api/tracks/methods.js';

import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

//react components
import Uploader from './Uploader.jsx';
import { DropzoneUploader } from "./Upload/DropzoneUploader.jsx";
import { UploadStatus } from "./Upload/UploadStatus.jsx";

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
      uploading: false,
      uploadComplete: false,
      trackImage: ''
    }

    this.change = this.change.bind(this);
  }
componentDidMount() {
  this.initMaterialize();
  this.hideUploadElements();
  $("#visability").click(function() {
      let licenseType = $("#visablity").prop('checked');
      let privateStatus = $("#private").prop('checked');
  });
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
  $("#display-track").hide();
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
  console.log('fired');
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
      self.setState({ progress: upload.progress() * 100, uploading: true });
    }
  }); 
}
change(e) {
  e.preventDefault();
  $("#photolink").empty();
  const file = $("#track-photo")[0].files[0];
  const self = this;
  /* send track-image to s3 */
  const upload = new Slingshot.Upload("trackAvatarToAmazonS3");
    upload.send(file, function(err, source) {
      if (err) {
        this.setState({ progress: 0 });
        console.error(err);
        alert(err);
        return;
      }
      function testSrc(src) {
      if (src === "undefined") {
        return './defaultAvatar.jpeg';
      }
       return src.replace('https://jahosh-meteor-files.s3-us-west-2', 'https://jahosh-meteor-files-resized.s3-us-west-1');
    }
    reSizedsource = testSrc(source)
      $("#photolink").append(reSizedsource);
      $("#default-artwork").css("background-image", "url(" + reSizedsource + ")"); 
      $("#display-track").show("slow");
    });
}
saveTrack(source, fileKey) {
  let title             = $("#beatTitle").val(),
      price             = $("#beatPrice").val(),
      genre             = $("#beat-genre option:selected").val(),
      description       = $("#track-desc").val(),
      privateSelect     = $("#private").prop("checked"),
      publicSelect      = $("#public").prop("checked"),
      visability        = privateSelect ? true : false,
      licenseType       = $("#track-license option:selected").val(),
      trackImage        = $("#photolink").text();

  if (title === '') {
    alert('please enter a title');
  return;
  }
  let track = {
    title: title,
    price: parseInt(price),
    genre: genre,
    licenseType: licenseType,
    fileSource: source,
    fileKey: fileKey,
    setPrivate: visability,
    trackImage: trackImage
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
      <DropzoneUploader
        config={this.config}
        eventHandlers={eventHandlers}
        djsConfig={this.djsConfig}
      />

    <div className="col s12" id="display-track"> 
      <div className="center-align">
        track photo:
        <span className="center-align" id="default-artwork"></span>
        <div id="photolink"></div>
      </div>
    </div> 

      <UploadStatus
        uploadProgress={uploadStyle.width} 
      />
 

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
              <div className="input-field col s6" id="license">
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
            <div className="col s12">
                  <div className="file-field input-field">
                    <div className="btn grey darken-4">
                      <span>Update image</span>
                      <input onChange={this.change} id="track-photo" type="file" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" type="text" />
                    </div>
                  </div>
                  <label htmlFor="textarea1">Track Photo (.jpeg/.jpg/.png under 3mb)</label>
              </div>
            </div>
            <div className="row">
            <div className="radio col s6" id="visability">
            <b>Track visability</b>
                <p>
                  <input name="public-private" type="radio" value="public" id="public" />
                  <label htmlFor="public">Public</label>
                </p>
                <p>
                  <input name="public-private" type="radio" value="private" id="private" />
                  <label htmlFor="private">Private</label>
                </p>
              </div>
              
            </div>
            <div id="uploadSubmit">
            <button id="uploadBtn" className="btn waves-effect waves-light grey darken-4 center-align" type="submit" name="action">Submit
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