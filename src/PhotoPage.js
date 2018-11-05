import React, { Component } from 'react';
import PhotoTile from './PhotoTile.js';
import LoadPageButton from './LoadPageButton.js';
import ModalContainer from './modal/ModalContainer.js';

class PhotoPage extends Component {
	constructor( props ) {
		super(props);
    this.state = {
      retina: this.calcIsRetina(),
      device_width: this.calcDeviceWidth(),
      photo_size_id: this.calcImageWidth(),
      modal_photo: null,
      show_modal_description: false,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
	}


  calcIsRetina(){
    return window.devicePixelRatio > 1
  }

  calcImageWidth(){
    let deviceWidth = this.calcDeviceWidth();
    let minMobileColumns = 3;
    let borderWidth = 4;
    let maxImageWidth = (deviceWidth / minMobileColumns) - borderWidth
    if( this.calcIsRetina() ){
      maxImageWidth *= 2
    }
    let optimalImageSizeID = this.getPhotoSizeIdFromWidth(maxImageWidth);

    return optimalImageSizeID;

  }

  calcDeviceWidth(){
    return window.innerWidth;
  }


  // uses max width available for photos and finds the api size id that will come closest
  getPhotoSizeIdFromWidth(max_width){
    let sizeID;
    switch (true) {
      case (max_width < 100):
        sizeID = 1;
        break;
      case (max_width < 140):
        sizeID = 100;
        break;
      case (max_width < 200):
        sizeID = 2;
        break;
      case (max_width < 280):
        sizeID = 200;
        break;
      case (max_width < 440):
        sizeID = 3;
        break;
      case (max_width < 600):
        sizeID = 440;
        break;
      default:
        sizeID = 600;
        break;
    };

    return sizeID;

  }

  // returns the width of a cropped photo based on the api's size id 
  checkPhotoWidth(photo_size_id){
    let width;
    switch (photo_size_id) {
      case 1:
        width = 70;
        break;
      case 2:
        width = 140;
        break;
      case 3:
        width = 280;
        break;
      case 100:
      case 200:
      case 440:
      case 600:
        width = photo_size_id;
        break;
      default:
        break;
    }

    return width;

  }


  // updates window dimension and potentially photo size id
  updateDimensions() {
    this.setState({ 
      device_width: this.calcDeviceWidth(),
      photo_size_id: this.calcImageWidth()
    });
  }

  componentDidMount() {
    // listens for resizing the browser
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }


  openPhotoModal(photo){
    this.setState({modal_photo: photo});
  }

  closeModal(){
    this.setState({modal_photo: null});
    this.toggleDescription(false);
  }

  toggleDescription(showDescription = !this.state.show_modal_description){
    this.setState( {show_modal_description: showDescription} );
  }


  renderPhotoTileCollection(){
    let photo_width = this.state.retina 
                ? Math.floor( this.checkPhotoWidth(this.state.photo_size_id) / 2 )
                : this.checkPhotoWidth(this.state.photo_size_id);
    let tileCollection = this.props.photos.map( function(photo){
      return this.renderPhotoTile(photo, photo_width);
    }, this)

    return tileCollection;

  }

  renderPhotoTile(photo, photo_width){
    return <PhotoTile 
              key={photo.id} 
              photo_width={ photo_width }
              onClick={() => this.openPhotoModal(photo)} 
              alt={photo.name} 
              photo={photo} 
              photo_size_id={this.state.photo_size_id} />;
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
          toggleDescriptionMethod={() => this.toggleDescription()}
          show_modal_description={this.state.show_modal_description} />
      </div>
    )
  }

}

export default PhotoPage;