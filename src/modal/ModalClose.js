import React from 'react';

function ModalClose(props) {
  return(
  	<span class="buttons">
			<button 
        class="modalIcon modalClose" 
        onClick={ props.modalCloseMethod } ></button>
			<button 
        class="modalIcon toggleDescription" 
        onClick={ props.toggleDescriptionMethod }></button>
		</span>
  )
}

export default ModalClose;
