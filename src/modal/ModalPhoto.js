import React from 'react';

function ModalPhoto(props) {
  return(
    <img alt={ props.alt } class="fullImage" src={ props.src } />
  )
}

export default ModalPhoto;
