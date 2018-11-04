import React, { Component } from 'react';
import ModalPhoto from './ModalPhoto.js';
import ModalClose from './ModalClose.js';
import PhotoDescription from './PhotoDescription.js';

class ModalContainer extends Component {
	render(){
    if(!this.props.modal_photo) {
      return null;
    }
    return(
    	<div class="modal">
	        <ModalClose onClick={() => this.props.modalCloseMethod()} />    	
	        <ModalPhoto src={this.props.modal_photo.images[6]} />
          <PhotoDescription 
            photo={this.props.modal_photo} 
            show_modal_description={this.props.show_modal_description}
            onClick={() => this.props.toggleDescriptionMethod()} />   
	    </div>
      )
  }
}

export default ModalContainer;
