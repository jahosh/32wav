import React, { Component, PropTypes } from 'react';

// allows a user to filter based on categories
export default class TracksCategories extends Component {
  componentDidMount() {
     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
   $(document).ready(function() {
    $('select').material_select();
  });
  }
  render() {
    return (
      <div className="row">
      <header>
      <h3> Filters </h3>
        <div className="input-field col l4">
          <select>
            <option value="" defaultValue>Choose your option</option>
            <option value="1">Hip-Hop / Boom-Bap</option>
            <option value="2">Hip-Hop / Trap</option>
            <option value="3">Hip-Hop / WestCoast</option>
          </select>
          <label>Genre</label>
        </div>
        <div className="input-field col l4">
          <select>
            <option value="" defaultValue>Any</option>
            <option value="1">Lease</option>
            <option value="2">Exclusive</option>
          </select>
          <label>License Type</label>
        </div>
        <div className="input-field col l4">
          <select>
            <option value="" defaultValue>Any</option>
            <option value="1"> $0 - $50 </option>
            <option value="2"> $50 - $250 </option>
            <option value="3"> $250 - $500</option>
          </select>
          <label>Price</label>
        </div>
        </header>
      </div>
    );
  }
}