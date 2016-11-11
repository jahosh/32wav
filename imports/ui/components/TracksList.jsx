import React, { Component } from 'react';

//react components
import TracksCategories from './TracksCategories';

//responsible for rending a list of beats
const TracksList = (props) => {
  return (
    <div className="beatList"> 
      <TracksCategories />
      <ul className="collection">
        { props.handleRenderTracks() }
      </ul>
    </div>
  );
}

export default TracksList;