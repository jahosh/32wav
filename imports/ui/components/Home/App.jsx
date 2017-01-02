import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

//react components
import Header from './Header.jsx';

export default class App extends Component {
  componentDidMount() {
    this.searchInput.focus();
  }
  handleSearch(e) {
    e.preventDefault();
    let term = $("#main-search").val()
    browserHistory.push('/search/' + term);
  }
  render() {
    return (  
      <div className="row">
        <div>
          <Header />
          <div className="row" id="home-body">
            <div className="col s12 m12 l10 offset-l1 center-align home-content">
              <p className=" flow-text tagline" id="headline"></p>
                <form className="hide-on-small-only" onSubmit={this.handleSearch} >
              <div className="input-field ">
                <input id="main-search" type="search" required ref={ (input) => { this.searchInput = input; }} />
                <i className="material-icons">close</i>
              </div>
            </form>
            </div>
            
            <div className="col s12 m12 l10 offset-l1 center-align" id="signup-heading">
              <div className="col s6 l6 offset-l3 offset-s3">
                <Link className="waves-effect waves-light btn-large grey darken-4" id="signup-btn" to="/signin">SEARCH</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l10 offset-l1" id="home-info">
             <div className="row">
               <div className="col s4 center-align">
                <i className="large material-icons">volume_up</i>
                <br />
                <h5>Stream</h5>
                <br />
                <p>effortlessly stream instrumentals</p>            
              </div>
                 <div className="col s4 center-align">
                <i className="large material-icons">system_update_alt</i>
                <br />
                <h5>Download</h5>
                <br />
                <p>download your favorite instrumentals</p>
              </div>
              <div className="col s4 center-align">
                <i className="large material-icons">visibility</i>
                < br />
                <h5>Connect</h5> <br />
                <p>connect with talented producers from all over</p>
              </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    );
  }
}
