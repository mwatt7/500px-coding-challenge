import React, { Component } from 'react';
import PhotoTile from './PhotoTile.js';

class PhotoCollection extends Component {
	constructor( props ) {
		super(props);
    this.state = {
      photo_size_id: 20
    }
	}

  renderPhotoTileCollection(){
    let tileCollection = this.props.photos.map( function(photo){
      return this.renderPhotoTile(photo);
    }, this)

    return tileCollection;

  }

  renderPhotoTile(photo){
    return <PhotoTile key={photo.id} image_url={photo.images[ this.state.photo_size_id ]} />;
  }

  render() {
    return (
      <div>{this.renderPhotoTileCollection()}</div>
    )
  }

}

export default PhotoCollection;