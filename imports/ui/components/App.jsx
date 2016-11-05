import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Blaze from 'meteor/gadicc:blaze-react-component';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';


// mongo collection
import { Beats } from '../../api/beats/beats.js';
import { Mp3s } from '../../api/beats/mp3s.js';

//react containers
import BeatsContainer from '../containers/BeatsContainer.jsx';

//react components
import Header from './Header.jsx';

//template helpers
import Upload from '../../photoupload.js';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  handleSubmitUpload(event) {
    event.preventDefault();

    const files = ReactDOM.findDOMNode(this.refs.songlink).files[0];

     if (files !== undefined) {
      //alert('please select a file');
      const file  = ReactDOM.findDOMNode(this.refs.songlink).files[0].name;
    }

    const title = ReactDOM.findDOMNode(this.refs.songTitle).value.trim();
    
    Meteor.call('songs.insert', title, file);
    
    ReactDOM.findDOMNode(this.refs.songTitle).value = '';
    ReactDOM.findDOMNode(this.refs.songlink).value = '';
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
  beats: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer( () => {
  const subscription = Meteor.subscribe('beats');
  const loading = !subscription.ready();
  const beats = Beats.find({}, { limit: 3, sort: { createdAt: -1 } }).fetch();
  const currentUser = Meteor.user();
  return {
    beats: beats,
    incompleteCount: Beats.find({ checked: { $ne: true } }).count(),
    currentUser: currentUser,
    loading: loading,
  };
}, App);