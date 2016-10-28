import React, { Component, PropTypes } from 'react';



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
      <div className="center">
    <a className='dropdown-button btn indigo lighten-1' href='#' data-activates='dropdown1'>Drop Me!</a>


 <ul id='dropdown1' className='dropdown-content'>
    <li><a className="indigo lighten-1" href="#!">one</a></li>
    <li><a href="#!">two</a></li>
    <li className="divider"></li>
    <li><a href="#!">three</a></li>
  </ul>
  </div>
    );
  }
}