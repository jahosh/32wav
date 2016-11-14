import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import { Tracks } from '../../api/tracks/tracks.js';

//react components
import Charts from '../components/Charts.jsx';
import TracksCategories from '../components/TracksCategories';

const TRACKS_PER_PAGE = 1;
const StartAt = 0
const pageNumber = new ReactiveVar(1)


/*         -- BrowseContainer --
 * Container responsible for the Browse view.
 * Grabs data for all children views.
*/
class BrowseContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 0
    }
  }
  loadMore(e) {
    pageNumber.set(pageNumber.get() + 1 );
  }
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
          onLoadMore={this.loadMore.bind(this)} 
        />
      </div>
      }
        <div className="center-align">
          <ul className="pagination">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active"><a href="#!">1</a></li>
            <li className="waves-effect"><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
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
  const subscription = Meteor.subscribe('Tracks', TRACKS_PER_PAGE * pageNumber.get()  );
  const loading = !subscription.ready();
  const tracks = Tracks.find({}).fetch();
  console.log(tracks);
  const currentUser = Meteor.user();
  console.log(currentUser);
  return {
    tracks: tracks,
    currentUser: currentUser,
    loading: loading,
  };
}, BrowseContainer);