import React, { Component } from 'react';


//responsible for rending a list of beats
const BeatsList = (props) => {
  return (
    <div className="col s12 m9 offset-m3 mainBody">
      <h3 className="valign center recentlyUploaded"> Last 3 uploaded beats - </h3>

      <ul className="collection">
        { props.handleRenderSongs() }
      </ul>
    </div>
  );
}

export default BeatsList;