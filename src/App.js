import React, { Component } from 'react';
import './App.css';

const api_key_500px = process.env.REACT_APP_500PX_API_KEY
const api_root_query = "https://api.500px.com/v1/photos"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: [],
      query_params : {
        feature: "popular",
      }
    }
  }

  build_query(){
    let query = api_root_query + "?";
    query += `consumer_key=${api_key_500px}`;
    for ( let param in this.state.query_params ){
      let key = param;
      let value = this.state.query_params[param];
      if ( value ){
        query += `&${key}=${value}`;
      }
    }

    return query;

  }

  componentDidMount() {
    fetch( this.build_query() )
      .then(response => response.json())
      .then(data => this.setState({ photos: data.photos.map( p => p.image_url) }))
  }

  render() {
    return (<div>{this.state.photos}</div>);
  }

}

export default App;
