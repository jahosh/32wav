import React, { Component, PropTypes } from 'react';

//react containers
import TracksContainer from '../containers/TracksContainer.jsx';
export default class Charts extends Component {
  render() {
    return (
      <div>   
        <TracksContainer
          tracks={this.props.tracks}
          currentUser={this.props.currentUser}
          onLoadMore={this.props.onLoadMore}
          genreFilter={this.props.genre}
        />
      </div>  
    );
  }
}