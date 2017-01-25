import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//react components
import Charts from '../components/Charts.jsx';
import TracksCategories from '../components/TracksCategories';

/*      -- BrowseContainer --
 * Container responsible for the Browse view.
 * Grabs data for all children views.
 * Handles filtering state
*/
class BrowseContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      genre: 'all',
      type: 'all',
    }
  }
  componentDidMount() {
    document.title = "Browse | 32wav ";
    this.handleFilterChange();
  }
  handleFilterChange() {
    const self = this;
    $('#genre').on('change', 'select', function(e){ 
      let value = $(this).val()
      self.setState({ genre: value });
    });
    $('#type').on('change', 'select', function(e) {
      let value = $(this).val()
      self.setState({ type: value });
    });
  }
  render() {
    return (
      <div>
        {this.props.loading ? <Blaze template="spinner" /> :
          <div className="row">
              <div className="col s12 m12 l10 offset-l1" id="browse-header">
                <header className="background-header text-center" id="charts-header">
                  <h1 className="center">Browse</h1>
                </header>
              <TracksCategories
                genre={this.state.genre}
                type={this.state.type}
                trackCount={this.props.trackCount}
                onFilterChange={this.handleFilterChange.bind(this)}
              />
              </div> 
              <Charts
                tracks={this.props.tracks}
                currentUser={this.props.currentUser}
                filters={this.state}
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
export default createContainer( (props) => {
  const subscription = Meteor.subscribe('Tracks.all', 10);
  const loading = !subscription.ready();
  const tracks = Tracks.find({}, { sort: { createdAt: -1 } }).fetch();
  const trackCount = Counts.get('total-tracks')
  const currentUser = Meteor.user();
  return {
    tracks: tracks,
    currentUser: currentUser,
    loading: loading,
    trackCount: trackCount,
  };
}, BrowseContainer);