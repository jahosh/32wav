import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

import { Purchase } from '../pages/Purchase.jsx';

export default class PurchaseContainer extends Component {
  render() {
    return (
      <div>
      <h1>Purchase</h1>
      <Purchase />
      </div>
    );
  }
}

