import React, { Component } from 'react';

//react components
import BeatCategories from './BeatCategories';

//responsible for rending a list of beats
const BeatsList = (props) => {
  return (
    <div className="col s12 m9 l12 offset-l2 beatList">
    <div className="card-panel center">
    <img src="./phlogo.png" height="150px" />
    </div>
      <p className="flow-text center">Charts</p>
      <div className="divider"></div>
      <div className="divider"></div>
      <div className="headerImg">
        <header className="background-header text-center" id="welcome-header">
        <h1 className="center">Welcome to 32wav</h1>
        </header>
      </div>
      
      <BeatCategories />
      <ul className="collection">
        { props.handleRenderSongs() }
      </ul>
    </div>
  );
}

export default BeatsList;