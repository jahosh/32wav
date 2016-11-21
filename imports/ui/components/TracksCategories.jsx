import React, { Component, PropTypes } from 'react';

// allows a user to filter based on categories
export default class TracksCategories extends Component {
   constructor(props){
    super(props)
  }
  componentDidMount() {
    this.initMaterialize();
    this.props.onFilterChange();
  }
  initMaterialize() {
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
  }
  render() {
    return (
      <div className="row">
      <header>
      <h5> Filters </h5>
        <div className="input-field col l4" id="genre">
          <select>
            <option value="all" defaultValue>All</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="electronic">Electric</option>
            <option value="indie">Indie</option>
          </select>
          <label>Genre</label>
          {this.props.genre}
        </div>
        <div className="input-field col l4" id="license">
          <select>
            <option value="all" defaultValue>All</option>
            <option value="lease">Lease</option>
            <option value="exclusive">Exclusive</option>
          </select>
          <label>License Type</label>
          {this.props.license}
        </div>
        <div className="input-field col l4" id="price">
          <select>
            <option value="all" defaultValue>All</option>
            <option value="50"> $0 - $50 </option>
            <option value="250"> $50 - $250 </option>
            <option value="500"> $250 - $500</option>
          </select>
          <label>Price</label>
          {this.props.price}
        </div>
        </header>
      </div>
    );
  }
}