import React, { Component } from 'react';

function PhotoTile(props) {
  let image_url = props.photo.images[ props.photo_size_id ];
  let style = {
    width: props.photo_width
  }
  return <img class="photoTile" style={style} onClick={ props.onClick } src={ image_url } />
}

export default PhotoTile;
