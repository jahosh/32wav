import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//react components
import Charts from '../components/Charts.jsx';
import TracksCategories from '../components/TracksCategories';


/*         -- BrowseContainer --
 * Container responsible for the Browse view.
 * Grabs data for all children views.
*/
class BrowseContainer extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> :
      <div className="row">
        <div className="col s12 m12 l10 offset-l1">
          <header className="background-header text-center" id="charts-header">
            <h1 className="center">Browse</h1>
          </header>
             <TracksCategories />
        </div>
        <Charts
          tracks={this.props.tracks}
          currentUser={this.props.currentUser} 
        />
      </div>
      }
      </div>
    );
  }
}

BrowseContainer.propTypes = {
  tracks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

export default createContainer( () => {
  const subscription = Meteor.subscribe('Tracks');
  const loading = !subscription.ready();
  const tracks = Tracks.find({}, { sort: { createdAt: -1 } }).fetch();
  const currentUser = Meteor.user();
  return {
    tracks: tracks,
    currentUser: currentUser,
    loading: loading,
  };
}, BrowseContainer);