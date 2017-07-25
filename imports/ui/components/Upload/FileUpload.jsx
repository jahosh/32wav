import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Blaze from 'meteor/gadicc:blaze-react-component';
import { Router, browserHistory, Link } from 'react-router';
import { default as swal } from 'sweetalert2';
import '../../../../node_modules/sweetalert2/dist/sweetalert2.min.css';

//methods
// import { insertTrack } from '../../../api/tracks/methods.js';

import '../../../../node_modules/dropzone/dist/min/dropzone.min.css';
import '../../../../node_modules/react-dropzone-component/styles/filepicker.css';

//react components
import Uploader from './Uploader.jsx';
import { DropzoneUploader } from "./DropzoneUploader.jsx";
import { UploadStatus } from "./UploadStatus.jsx";


import { template } from './DropzoneTemplate.js';

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

/*
// use this to check and make sure that file is uploaded before being sent to S3""
  $("#track-photo").click(function(event){
    event.preventDefault();
});
*/
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
  // make sure track is uploaded before handling avatar;
  if ($("#beatTitle").val() === '') {
    alert('please add a song');
    $("#track-photo").val(""); 
    return;
  }
  $("#photolink").empty();
  const file = $("#track-photo")[0].files[0];
  const self = this;
  /* send track-image to s3 */
  const upload = new Slingshot.Upload("trackAvatarToAmazonS3");
    upload.send(file, function(err, source) {
      if (err) {
        self.setState({ progress: 0 });
        console.error(err);
        alert(err);
        return;
      }
      self.setState({ processing: true });
      Meteor.setTimeout(function(){ 
        self.setState({ uploading: false, processing: false });

        /*
             function testSrc(src) {
      if (src === "undefined") {
        return './defaultAvatar.jpeg';
      }
       return src.replace('https://jahosh-meteor-files.s3-us-west-2', 'https://jahosh-meteor-files-resized.s3-us-west-1');
    }
    */
     //testSrc(source)
      $("#photolink").append(source);
      $("#photolink").hide();
      $("#default-artwork").css("background-image", "url(" + source + ")"); 
      $("#display-track").show("slow"); 
      
     }, 2000);
  
    });
}
saveTrack(source, fileKey) {
  console.log('fired', source, fileKey);

  let title             = $("#beatTitle").val(),
      artist            = $("#artistName").val(),
      genre             = $("#beat-genre option:selected").val(),
      publicSelect      = $("#public").prop("checked"),
      trackImage        = $("#photolink").text();

  if (title === '') {
    alert('please enter a title');
  return;
  }

  if (trackImage === "") {
    trackImage = "./32wav.jpg";
  }

  let downloadable = publicSelect ? true : false;

  let track = {
    title: title,
    artist: artist,
    genre: genre,
    fileSource: source,
    fileKey: fileKey,
    setPrivate: false,
    trackImage: trackImage,
    download: downloadable
  }

  console.log(track);

  Meteor.call('tracks.insert', track, (err) => {
    if (err) {
      console.log(err);
      alert(err);
      return;
    }
    this.displayFileUploaded();
  });
  console.log('pass the call');
}
handleSubmit(e) {
  e.preventDefault();
}
resendVeri() {
  Meteor.call('sendVerificationLink', (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      console.log('sent');
    }
  });
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
  const { currentUser } = this.props;
  return (
    <div className="row">  
      { this.props.currentUser.emails[0].verified ?
        <div>
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
                  type="text"
                  id="artistName"
                  ref="artistName"
                />
                <label htmlFor="artistName">Artist</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6" id="license">
                <select id="track-license">
                  <option defaultValue="">Select a type</option>
                  <option value="official">Official Instrumental</option>
                  <option value="remake">Remake</option>
                </select>
                <label>Type</label>
              </div>
              <div className="input-field col s6">
                <select id="beat-genre">
                  <option defaultValue="">Select a genre</option>
                  <option value="rap">Rap</option>
                  <option value="rnb">R&B</option>
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
                <b>Downloadable</b>
                <p>
                  <input name="public-private" type="radio" value="downloadable-yes" id="public" />
                  <label htmlFor="public">Yes</label>
                </p>
                <p>
                  <input name="public-private" type="radio" value="downloadable-no" id="private" />
                  <label htmlFor="private">No</label>
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
           :
          <div>
          please verify email
            <Link onClick={this.resendVeri}>resend email</Link>
        </div>
      }
      </div>
    );
  }
}