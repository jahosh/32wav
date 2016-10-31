import React, { Component, PropTypes } from 'react';

//react containers
import BeatsContainer from '../containers/BeatsContainer.jsx';
export default class Charts extends Component {
  render() {
    return (
      <div>
        <p className="flow-text center"><i className="em em-fire"></i>Popular</p>
        <BeatsContainer
          beats={this.props.beats}
          currentUser={this.props.currentUser}
        />
      </div>  
    );
  }
}