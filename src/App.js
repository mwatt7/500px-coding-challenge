import React, { Component } from 'react';
import './App.css';

const api_key_500px = process.env.REACT_APP_500PX_API_KEY
const api_root_query = "https://api.500px.com/v1/photos"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: [],
    }
  }

  build_query(){
    let query = api_root_query + "?";
    query += "consumer_key=" + api_key_500px;
    query += "&feature=popular";

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
