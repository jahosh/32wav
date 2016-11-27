import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { Purchase } from '../pages/Purchase.jsx';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

class PurchaseContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="center-align">
      { this.props.loading ? <Blaze template="spinner" /> : 
      <div>
        <h3>{this.props.track[0].title}</h3>
        <h5>${this.props.track[0].price}</h5>
       
        <Purchase
          track={this.props.track[0]}
          seller={this.props.seller}
        />
      </div>
      }
      </div>
    );
  }
}

export default createContainer( (props) => {
  const trackId = props.params.trackId;
  const subscription = Meteor.subscribe('Tracks.purchase', trackId);
  const loading = !subscription.ready();
  const track = Tracks.find({ _id: trackId }, { fields: { "title": 1, price: 1, } }).fetch();
  const seller = Meteor.users.findOne({}, { fields: { paypal: 1 } });
  console.log(seller);


  return {
   track: track,
   loading: loading,
   seller: seller,
  };
}, PurchaseContainer);