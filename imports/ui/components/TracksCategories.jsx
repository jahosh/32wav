import React, { Component, PropTypes } from 'react';

// allows a user to filter based on categories
export default class TracksCategories extends Component {
   constructor(props){
    super(props)
  }
  componentDidMount() {
     $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
     });

     $(document).ready(function() {
        $('select').material_select();
      }); 

      this.props.onChange();
  }
  render() {
    console.log("Track_CAT")
    return (
      <div className="row">
      <header>
      <h3> Filters </h3>
        <div className="input-field col l4" id="genre">
          <select>
            <option value="" defaultValue>All</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="electronic">Electric</option>
            <option value="indie">Indie</option>
          </select>
          <label>genre</label>
          <p>{this.props.genre}</p>
        </div>
        <div className="input-field col l4">
          <select>
            <option value="" defaultValue>All</option>
            <option value="1">Lease</option>
            <option value="2">Exclusive</option>
          </select>
          <label>License Type</label>
        </div>
        <div className="input-field col l4">
          <select>
            <option value="" defaultValue>All</option>
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