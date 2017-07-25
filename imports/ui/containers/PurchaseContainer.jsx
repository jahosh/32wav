import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { Purchase } from '../pages/Purchase.jsx';

// mongo collection
import Tracks from '../../api/Tracks/Tracks';

class PurchaseContainer extends Component {
  render() {
    return (
      <div className="center-align">
      { this.props.loading ? <Blaze template="spinner" /> : 
      <div>
        <h3>{this.props.track.title}</h3>
        <h5>${this.props.track.price}</h5>
       
        <Purchase
          track={this.props.track}
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
  const track = Tracks.findOne({ _id: trackId });
  const owner = track ? track.owner : {};
  const seller = Meteor.users.findOne(owner);
  return {
   track: track,
   loading: loading,
   seller: seller,
  };
}, PurchaseContainer);