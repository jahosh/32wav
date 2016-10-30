import React, { Component, PropTypes } from 'react';


// allows a user to filter based on categories
export default class BeatCategories extends Component {
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

  }
  render() {
    return (
      <div>
        <a className='dropdown-button btn indigo lighten-1 categories' href='#' data-activates='dropdown1'>Categories</a>
        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!">Rap</a></li>
          <li><a className="text-black" href="#!">Trap</a></li>
          <li className="divider"></li>
          <li><a href="#!">R&B</a></li>
        </ul>
      </div>
    );
  }
}