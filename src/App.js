import React, { Component } from 'react';
import PhotoCollection from './PhotoCollection.js';
import './App.css';

const api_key_500px = process.env.REACT_APP_500PX_API_KEY;
const api_url = "https://api.500px.com/v1";
const default_api_action = "photos"

class App extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      photos: [],
      query_params : {
        feature: "popular",
        image_size: [20, 21, 6]
      }
    }
  }

  build_query( action = default_api_action ) {
    let query = `${api_url}/${action}?`;
    query += `consumer_key=${api_key_500px}`;
    for ( let param in this.state.query_params ){
      let value = this.state.query_params[param];
      if ( value ){
        query += `&${param}=${value}`;
      }
    }

    return query;

  }

  savePhotosToState( api_data ){
    let newPhotoStateData = api_data.photos.map( function(photo){
      let new_photo = {
        id: photo.id
      }
      let photoImages = {};
      for ( let i in photo.images ){
        photoImages[ photo.images[i]["size"] ] = photo.images[i]["url"];
      };
      new_photo.images = photoImages;

      return new_photo;

    })

    this.setState({ photos: newPhotoStateData })

  }

  componentDidMount() {
    fetch( this.build_query() )
      .then(response => response.json())
      .then(data => this.savePhotosToState(data) )
  }

  render() {
    return ( <PhotoCollection photos={this.state.photos} />);
  }

}

export default App;
