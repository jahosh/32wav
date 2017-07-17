import React, { Component } from 'react';
import BootstrapPaginator from 'react-bootstrap-pagination';

//react components
import TracksCategories from './TracksCategories';

//responsible for rending a list of beats
const TracksList = (props) => {
  return (
    <div className="beatList"> 
      <ul className="collection">
        { props.handleRenderTracks() }
      </ul>
    </div>
  );
}

export default TracksList;