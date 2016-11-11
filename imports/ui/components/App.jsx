import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';


// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//react components
import Header from './Header.jsx';



class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <Header />
        <div className="col s12 m12 l10 offset-l1 card panel center" id="main-heading">
          <h2 className="center-align">The Beat Marketplace Where</h2>
        </div>
        <div className="home-content">
          <div className="col s12 m6 l6 center-align">
            <p className="promo-caption">Producers</p>
            <p className="flow-text">
              Can sell beats online efficently and smoothly.
            </p>
          </div>
          <div className="col s12 m6 l6 center-align">
            <p className="promo-caption">Artists</p>
            <p className="flow-text">
              Can purchase beats from producers without the hassle.
            </p>
          </div>
          <div id="divider"></div>
          <div className="col s12 m12 l10 offset-l1 center" id="signup-heading">
            <h3 className="center-align">Sign Up</h3>
          <Link className="waves-effect waves-light btn blue-grey darken-1" to="/signin"><i className="material-icons left">cloud</i>Register Here!</Link>
          </div>
        </div>        
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, App);