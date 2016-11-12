import React, { Component } from 'react';

//react components
import TracksCategories from './TracksCategories';

//responsible for rending a list of beats
const TracksList = (props) => {
  return (
    <div className="beatList"> 
      <ul className="collection">
        { props.handleRenderTracks() }
      </ul>
      <div className="center-align">
      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li className="waves-effect"><a href="#!">2</a></li>
        <li className="waves-effect"><a href="#!">3</a></li>
        <li className="waves-effect"><a href="#!">4</a></li>
        <li className="waves-effect"><a href="#!">5</a></li>
        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
      </div>
    </div>
  );
}

export default TracksList;