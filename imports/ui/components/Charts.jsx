import React, { Component, PropTypes } from 'react';

//react containers
import TracksContainer from '../containers/TracksContainer.jsx';
export default class Charts extends Component {
  render() {
    console.log('triggered container');
    return (
      <div>   
        <TracksContainer
          tracks={this.props.tracks}
          currentUser={this.props.currentUser}
          genreFilter={this.props.filters}
        />
      </div>  
    );
  }
}