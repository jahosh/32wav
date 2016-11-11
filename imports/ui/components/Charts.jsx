import React, { Component, PropTypes } from 'react';

//react containers
import TracksContainer from '../containers/TracksContainer.jsx';
export default class Charts extends Component {
  render() {
    return (
      <div>   
        <TracksContainer
          beats={this.props.beats}
          currentUser={this.props.currentUser}
        />
      </div>  
    );
  }
}