import React, { Component } from 'react';

//responsible for rending a list of beats

const BeatsList = (props) => {
  return (
    <div className="col s12 m9 beatList">
      <p className="flow-text center">Charts</p>
      <ul className="collection">
        { props.handleRenderSongs() }
      </ul>
    </div>
  );
}

export default BeatsList;