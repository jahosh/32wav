import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import container from '../../modules/container.js';

// mongo collection
import Tracks from '../../api/Tracks/Tracks';

//react components
import Charts from '../components/Charts.jsx';
import TracksCategories from '../components/TracksCategories';

/*      -- BrowseContainer --
 * Container responsible for the Browse view.
 * Grabs data for all children views.
 * Handles filtering state
*/
export default class BrowseContainer extends Component {
  constructor(props){
    super(props)

    this.pagination = new Meteor.Pagination(Tracks, {
      name: 'tracks.paginatedList',
      filters: {},
      sort: {
        createdAt: -1
      },
      perPage: 5,
      reactive: true,
      debug: true
    });
  }
  componentDidMount() {
    document.title = "Browse | 32wav ";
  }
  render() {
    const { pagination } = this;
    return (
      <div>
        { this.props.loading ? <Blaze template="spinner" /> :
          <div className="row">
              <div className="col s12 m12 l10 offset-l1" id="browse-header">
                <header className="background-header text-center" id="charts-header">
                  <h1 className="center">Browse</h1>
                </header>
                <Charts
                  pagination={pagination}
                />
              </div> 
          </div>
        }
      </div>
    );
  }
}
// BrowseContainer.propTypes = {
//   tracks: PropTypes.array.isRequired,
//   currentUser: PropTypes.object,
//   loading: PropTypes.bool.isRequired,
// }



// export default createContainer( (props) => {
//   // const subscription = Meteor.subscribe('tracks.paginatedList');
  
//   // const loading = !subscription.ready();
//   const loading = false;
//   // const tracks = Tracks.find({}, { sort: { createdAt: -1 } }).fetch();
//   const tracks = [];
//   const trackCount = 0;
//   const currentUser = Meteor.user();
//   return {
//     tracks: tracks,
//     currentUser: currentUser,
//     loading: loading,
//     trackCount: trackCount,
//   };
// }, BrowseContainer);