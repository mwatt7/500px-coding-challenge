import React from 'react';

function PhotoDescription(props) {
    let containerClass = props.show_modal_description ? "descriptionContainer" : "descriptionContainer collapse";
    return (
      <div class={containerClass}>
        { props.photo.name 
          ? <div class="name">{props.photo.name}</div>
          : null
        }
        { props.photo.description 
          ? <div class="description">{props.photo.description}</div>
          : null
        }
      </div>
    )
}

export default PhotoDescription;
