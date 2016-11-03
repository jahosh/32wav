import React, { Component, PropTypes } from 'react';

//react containers
import BeatsContainer from '../containers/BeatsContainer.jsx';
export default class Charts extends Component {
  render() {
    return (
      <div>
      <h1 className="margin-left-15">Charts</h1>
      <span className="small margin-left-15">Browse uploaded beats</span>
     
        <div className="divider mrg-bottom-10"></div>
        <BeatsContainer
          beats={this.props.beats}
          currentUser={this.props.currentUser}
        />
      </div>  
    );
  }
}