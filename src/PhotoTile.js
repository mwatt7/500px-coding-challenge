import React, { Component } from 'react';

function PhotoTile(props) {
  let image_url = props.photo.images[ props.photo_size_id ];
  return <img onClick={ props.onClick } src={ image_url } />
}

export default PhotoTile;
