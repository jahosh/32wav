import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Blaze from 'meteor/gadicc:blaze-react-component';
import DropzoneComponent from 'react-dropzone-component';
import { Router } from 'react-router';
import { default as swal } from 'sweetalert2';
import '../../../node_modules/sweetalert2/dist/sweetalert2.min.css';


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
})
}
onDrop(file) {
  const self = this;
  self.displayUploadElements();

  console.log(file);

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
        self.saveTrack(source)
      });
  });

  let computation = Tracker.autorun( () => {
    const self = this
    if (!isNaN(upload.progress())) {
      self.setState({ progress: upload.progress() * 100 });
    }
  }); 
}
saveTrack(source) {
  let title = $('#beatTitle').val()
  let price = $('#beatPrice').val();
  let genre = $( "#beat-genre option:selected" ).text();
  if (title === '') {
    alert('please enter a title');
  return;
  }
  console.log(title);
  console.log(price);
  console.log(genre);

    Meteor.call('beats.insert', title, source, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('uploaded');

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
                <i className="material-icons prefix">queue_music</i>
                <input 
                  type="text"
                  id="beatTitle"
                  ref="beatTitle"
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
                <select id="beat-genre">
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
      
            <button id="uploadBtn" className="btn waves-effect waves-light blue-grey darken-1 center-align" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
            <div className="tos">
              <p className="small center-align">By uploading you agree to our <a href="#">terms of service</a> & also agree to own the copyright to the instrumental / song your uploading</p>
            </div>
          </div>
          </form>
          <div id="divider"> </div>
          <div>-</div>
        </div>     
      </div>
    );
  }
}