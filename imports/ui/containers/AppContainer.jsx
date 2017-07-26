import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';

//react components
import Navbar from '../components/Navbar.jsx';
window.prerenderReady = false;

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div> 
        <div>
          <Navbar
            currentUser={this.props.currentUser} />
            {this.props.children}
          </div> 
      </div>
    );
  }
}

AppContainer.propTypes = {
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, AppContainer);

