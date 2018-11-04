import React, { Component } from 'react';

class PhotoTile extends Component {
	constructor( props ) {
		super(props);
	}

  render() {
    return <img src={this.props.image_url} />
  }

}

export default PhotoTile;
