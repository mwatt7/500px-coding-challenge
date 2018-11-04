import React, { Component } from 'react';
import PhotoTile from './PhotoTile.js';
import LoadPageButton from './LoadPageButton.js';
import ModalContainer from './modal/ModalContainer.js';

class PhotoCollection extends Component {
	constructor( props ) {
		super(props);
    this.state = {
      photo_size_id: 440,
      modal_photo: null,
      show_modal_description: false,
    }
	}

  openPhotoModal(photo){
    this.setState({modal_photo: photo});
  }
  closeModal(){
    this.setState({modal_photo: null});
    this.toggleDescriptionMethod(false);
  }
  toggleDescriptionMethod(showDescription = !this.state.show_modal_description){
    this.setState( {show_modal_description: showDescription} );
  }

  renderPhotoTileCollection(){
    let tileCollection = this.props.photos.map( function(photo){
      return this.renderPhotoTile(photo);
    }, this)

    return tileCollection;

  }

  renderPhotoTile(photo){
    return <PhotoTile key={photo.id} onClick={() => this.openPhotoModal(photo)} photo={photo} photo_size_id={this.state.photo_size_id} />;
  }

  render() {
    return (
      <div class="page">
        <div class="pageHeader">
          <div class="applicationName">Matthew Watt</div>
          <div class="applicationDescription">500px Coding Challenge</div>
        </div>
        <div class="photoCollection">
          {this.renderPhotoTileCollection()}
        </div>
        <div class="pageFooter">
          <LoadPageButton onClick={() => this.props.loadPhotosMethod()} />
        </div>
        <ModalContainer 
          modal_photo={this.state.modal_photo} 
          modalCloseMethod={() => this.closeModal()}
          toggleDescriptionMethod={() => this.toggleDescriptionMethod()}
          show_modal_description={this.state.show_modal_description} />
      </div>
    )
  }

}

export default PhotoCollection;