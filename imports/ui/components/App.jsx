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


export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row">
        <div>
        <Header />
        <div className="row" id="home-body">
          <div className="col s12 m12 l10 offset-l1 center-align home-content">
            <p className="promo-caption flow-text" id="headline">Instrumental marketplace</p>
            <p className="flow-text tagline">
              high quality audio instrumentals
            </p>
          </div>
          <div className="col s12 m12 l10 offset-l1 center-align" id="signup-heading">
            <Link className="waves-effect waves-light btn-large black" id="signup-btn" to="/signin">SIGN UP FOR FREE</Link>
           
          </div>
          </div>
        </div>        
      </div>
    );
  }
}

