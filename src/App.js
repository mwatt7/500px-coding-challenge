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
      query_param_feature: "popular",
      query_param_image_size: [440, 6],
      query_param_page: 1,
      query_param_rpp: 48,
    }
  }

  build_query( action = default_api_action ) {
    let query = `${api_url}/${action}?`;
    query += `consumer_key=${api_key_500px}`;
    for ( let param in this.state ){
      if ( param.startsWith('query_param') ){
        let value = this.state[param];
        let query_param = param.replace('query_param_','')
        if ( value ){
          query += `&${query_param}=${value}`;
        }
      }
    }

    return query;

  }

  queryNextPage() {
    let nextPage = this.state.query_param_page + 1;
    this.setState({ query_param_page: nextPage }, function(){
      this.runQuery();
    });
  }

  savePhotosToState( api_data ){
    let newPhotoStateData = api_data.photos.map( function(photo){
      let new_photo = {
        id: photo.id,
        name: photo.name,
        description: photo.description,
      }
      let photoImages = {};
      for ( let i in photo.images ){
        photoImages[ photo.images[i]["size"] ] = photo.images[i]["url"];
      };
      new_photo.images = photoImages;

      return new_photo;

    })

    let oldPhotoStateData = this.state.photos
    this.setState({ photos: oldPhotoStateData.concat(newPhotoStateData) })

  }

  onScroll = () => {
    if ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight) ) {
      window.removeEventListener('scroll', this.onScroll, false);
      this.queryNextPage();
    }
  }

  runQuery() {
    fetch( this.build_query() )
      .then(response => response.json())
      .then(data => this.savePhotosToState(data) )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  componentDidMount() {
    this.runQuery();
  }

  render() {
    window.addEventListener('scroll', this.onScroll, false);
    return ( <PhotoCollection loadPhotosMethod={() => this.queryNextPage()} photos={this.state.photos} page={this.state.query_param_page} />);
  }

}

export default App;
