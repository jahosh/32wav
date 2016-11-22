import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//Components
import TracksList from '../components/TracksList.jsx';
import Track from '../components/Track.jsx';
import TracksCategories from '../components/TracksCategories';

class TracksContainer extends Component {
  constructor(props) {
    super(props);
  }
  renderTracks() {
    console.log(this.props);
    const allTracks      = this.props.tracks;
      
    const filteredTracks = allTracks.filter( (track) => {
      let genreFilter    = this.props.genreFilter.genre,
          priceFilter    = this.props.genreFilter.price,
          licenseFilter  = this.props.genreFilter.license;
        
      return this.checkFilter(track, genreFilter, priceFilter);
      });
 

    //filteredTracks = filteredTracks.filter(track => track.genre === this.props.genreFilter);
    return filteredTracks.map( (track) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = track.owner === currentUserId;
      const currentUser = Meteor.user();
      const source = track.fileSource;    
      return (
        <Track 
          key={track._id} 
          song={track}
          source={source}
          showPrivateButton={showPrivateButton}
          currentUser={currentUser}
        />
      );
    });
  }
  checkFilter(track, genreFilter, priceFilter, licenseFilter) {
    /*
    //if track is lte price-filter or set to "all tracks" return track
    if (track.price <= priceFilter || priceFilter === 0) {
      return track;
    }
    */
    let licenseType = this.props.genreFilter.license;

    if (track.genre === genreFilter || genreFilter === "all") {
      if (track.price <= priceFilter || priceFilter === 0) {
        if (licenseType === "all" || licenseType === track.licenseType ) {
            return track;
        }
      } 
    }
    /*
    if (genreFilter === "all" && priceFilter === 0 ) {
      return track;
    }
    
 
    if(track.price < priceFilter && track.genre === genreFilter) {
      return track;
    }

    if (track.price <= priceFilter && track.genre === "all") {
      return track;
    }
    */

    /*
     if (genreFilter === track.genre) {
      return track;
    }
    */
    /*
    if (genreFilter === "all" && priceFilter === "all") {
      return track;
    } else if (genreFilter === track.genre && priceFilter === "all") {
 
    } else {

    }
  
       if (genreFilter === "all") {
        if (priceFilter === "all") {
          if (licenseFilter === "all") {
            return track;
          }
        }
      }
  
      if (track.genre === genreFilter || track.genre === genreFilter && track.price <= priceFilter || priceFilter === 'all') {
        return track;
        */
        
  }
  render() {
    return (
      <div className="col s12 m12 l10 offset-l1">
       <TracksList
          handleRenderTracks={this.renderTracks.bind(this)} 
        />
          <div className="load-more center-align">
              <button className="btn" onClick={this.props.onLoadMore}>Load More</button>
            </div>
      </div>
    )
  }
}

TracksContainer.PropTypes = {
  tracks: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default createContainer( () => {
  const currentUser = Meteor.user();
  return {
    currentUser: currentUser,
  };
}, TracksContainer);
