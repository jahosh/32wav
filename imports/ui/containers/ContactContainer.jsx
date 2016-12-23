import React, { Component, PropTypes } from 'react';

//react components
import ContactForm from '../components/Contact/ContactForm.jsx';


export default class ContactContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l10 offset-l1">
          <header className="background-header text-center" id="contact-header">
            <h1 className="center">Contact</h1>
          </header>
        </div>
      </div>
    );
  }
}