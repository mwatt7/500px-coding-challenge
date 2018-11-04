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
      return {
        id: photo.id,
        images: photo.images.map(p => p.url),
      }
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
