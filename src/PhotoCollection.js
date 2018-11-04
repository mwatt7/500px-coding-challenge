import React, { Component } from 'react';
import PhotoTile from './PhotoTile.js';

class PhotoCollection extends Component {
	constructor( props ) {
		super(props);
	}

  renderPhotoTileCollection(){
    let tileCollection = this.props.photos.map( function(photo){
      return this.renderPhotoTile(photo);
    }, this)

    return tileCollection;

  }

  renderPhotoTile(photo){
    return <PhotoTile key={photo.id} image_url={photo.images[0]} />;
  }

  render() {
    return (
      <div>{this.renderPhotoTileCollection()}</div>
    )
  }

}

export default PhotoCollection;