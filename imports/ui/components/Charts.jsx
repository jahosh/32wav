import React, { Component, PropTypes } from 'react';
import BootstrapPaginator from 'react-bootstrap-pagination';
import container from '../../modules/container.js';
import Blaze from 'meteor/gadicc:blaze-react-component';


//react containers
import TracksContainer from '../containers/TracksContainer.jsx';
import TracksCategories from '../components/TracksCategories';
class Charts extends Component {
  render() {
    const { pagination } = this.props;
    return (
      <div>   
        <TracksCategories
          trackCount={this.props.trackCount}
          pagination={pagination}
        />
        <TracksContainer
          tracks={this.props.tracks}
          filters={this.props.filters}
          pagination={pagination}
        />
      </div>  
    );
  }
}

export default container((props, onData) => {
  if (props.pagination.ready()) {
    const tracks = props.pagination.getPage();
    const totalPages = props.pagination.totalPages();
    onData(null, { tracks, totalPages });
  }
}, Charts, { loadingHandler: () => <Blaze template="spinner" /> });