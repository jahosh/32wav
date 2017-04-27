import ReactDOMServer from 'react-dom/server';
import React from 'react';

export const template = ReactDOMServer.renderToStaticMarkup(
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