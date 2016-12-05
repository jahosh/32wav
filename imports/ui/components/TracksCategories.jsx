import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

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
  handleSearch(e) {
    e.preventDefault();
    let term = $("#search").val()
    console.log(term);

    browserHistory.push('/search/' + term);
  }
  render() {
    return (
      <div className="row">
      <header>
      <h5> Filters </h5>
        <div className="input-field col  s12 l4" id="genre">
          <select>
            <option value="all" defaultValue>All</option>
            <option value="hiphop">Hip-Hop</option>
            <option value="electronic">Electric</option>
            <option value="indie">Indie</option>
          </select>
          <label>Genre</label>
        </div>
        <div className="input-field col s12 l4" id="license">
          <select>
            <option value="all" defaultValue>All</option>
            <option value="lease">Lease</option>
            <option value="exclusive">Exclusive</option>
          </select>
          <label>License Type</label>
        </div>
        <div className="input-field col s12 l4" id="price">
          <select>
            <option value="0" defaultValue>All</option>
            <option value="50">  $50 </option>
            <option value="250"> $250 </option>
            <option value="500"> $500</option>
            <option value="1000"> $1000</option>
          </select>
          <label>Price</label>
        </div>
        </header>
         <div className="stats">
          <h5 className="stats">Stats</h5>
          <div id="divider"></div>
          <p>
            Total tracks: {this.props.trackCount}
          </p>
        </div>
         <form className="hide-on-small-only" onSubmit={this.handleSearch}>
              <div className="input-field ">
                <input id="search" type="search" placeholder="search..." required />
                <label htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
      </div>
    );
  }
}