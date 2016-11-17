import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Blaze from 'meteor/gadicc:blaze-react-component';

// mongo collection
import Tracks from '../../api/tracks/tracks.js';

//react components
import Charts from '../components/Charts.jsx';
import TracksCategories from '../components/TracksCategories';

const TRACKS_PER_PAGE = 10;
const StartAt = 0


/*         -- BrowseContainer --
 * Container responsible for the Browse view.
 * Grabs data for all children views.
*/
class BrowseContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      genre: 'All',
      page: 0
    }
  }
  componentDidMount() {
    this.handleChange();
  }
  loadMore(e) {
    pageNumber.set(pageNumber.get() + 1 );
  }
  handleChange() {
    const self = this;
    $('#genre').on('change', 'select', function(e){ 
    let value = $(this).val()

   self.setState({genre: value });
  });
  }
  load(div) {

    console.log('clicked');
    console.log(div);
   
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
              <TracksCategories
                genre={this.state.genre}
                onChange={this.handleChange.bind(this)}
              />
              </div> 
              <Charts
                tracks={this.props.tracks}
                currentUser={this.props.currentUser}
                onLoadMore={this.loadMore.bind(this)} 
                genre={this.state.genre}
              />
              <div className="center-align col s12 m12 l10 offset-l1">
                <ul className="pagination">
                  <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                  <li className="waves-effect" id="page-one"><Link to="/browse/1"activeClassName="active">1</Link></li>
                  <li className="waves-effect"><Link to="/browse/2" activeClassName="active">2</Link></li>
                  <li className="waves-effect"><Link to="/browse/3">3</Link></li>
                  <li className="waves-effect"><a href="#!">4</a></li>
                  <li className="waves-effect"><a href="#!">5</a></li>
                  <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                </ul>
             </div>
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
  const subscription = Meteor.subscribe('Tracks.all');
  const loading = !subscription.ready();
  const tracks = Tracks.find({}).fetch();
  console.log(subscription);
  console.log(loading);
  const currentUser = Meteor.user();
  return {
    tracks: tracks,
    currentUser: currentUser,
    loading: loading,
  };
}, BrowseContainer);