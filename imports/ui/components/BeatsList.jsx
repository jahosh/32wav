import React, { Component } from 'react';

//react components
import BeatCategories from './BeatCategories';

//responsible for rending a list of beats
const BeatsList = (props) => {
  return (
    <div className="col s12 m9 l12 offset-l2 beatList">
  
      
      <BeatCategories />
      <ul className="collection">
        { props.handleRenderSongs() }
      </ul>
    </div>
  );
}

export default BeatsList;