import React from 'react';
import DropzoneComponent from 'react-dropzone-component';


export const DropzoneUploader = (props) => {
  return (
    <div className="row">
      <DropzoneComponent
        config={props.config}
        eventHandlers={props.eventHandlers}
        djsConfig={props.djsConfig}
      />
      <div className="center-align" id="file-types">
        .mp3 / .mp4 / .wav - under 10mb
      </div>
    </div>
  );
}


