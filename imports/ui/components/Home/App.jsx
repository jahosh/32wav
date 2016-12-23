import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

//react components
import Header from './Header.jsx';

export const App = () => (
      <div className="row">
        <div>
          <Header />
          <div className="row" id="home-body">
            <div className="col s12 m12 l10 offset-l1 center-align home-content">
              <p className="promo-caption flow-text tagline" id="headline">Instrumental Marketplace</p>
            </div>
            <div className="col s12 m12 l10 offset-l1 center-align" id="signup-heading">
              <div className="col s6 l6 offset-l3 offset-s3">
                <Link className="waves-effect waves-light btn-large grey darken-4" id="signup-btn" to="/signin">SIGN UP FOR FREE</Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m12 l10 offset-l1" id="home-info">
             <div className="row">
              <div className="col s4 center-align">
                <i className="large material-icons">verified_user</i>
                < br />
                <h5>verified producers</h5> <br />
                buy tracks from reptable producers in the industry
              </div>

              <div className="col s4 center-align">
                <i className="large material-icons">queue_music</i>
                <br />
                <h5>high quality tracks</h5>
                <br />
                find instrumentals from top talent
              </div>
              <div className="col s4 center-align">
                <i className="large material-icons">shopping_cart</i>
                <br />
                <h5>quick checkout</h5>
                <br />
                payments securely handled by paypal            
              </div>
              </div>
            </div>
          </div>
        </div>        
      </div>
    );

