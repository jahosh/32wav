import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { Purchase } from '../pages/Purchase.jsx';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

class PurchaseContainer extends Component {
  render() {
    console.log(this.props.track[0]);
    return (
      <div>
      { this.props.loading ? <Blaze template="spinner" /> : 
      <div>
      <h1>Purchase</h1>
      <h2>${this.props.track[0].price}</h2>
      <Purchase
        track={this.props.track[0]} />
        </div>
      }
      </div>
    );
  }
}

export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks.purchase');
  const loading = !subscription.ready();
  const trackId = props.params.trackId;
  const track = Tracks.find(trackId, { fields: { "title": 1, price: 1, } }).fetch();
  return {
   track: track,
   loading: loading,
  };
}, PurchaseContainer);