import React from 'react'
import { Component } from 'react';
import axios from 'axios';

const location_key = import.meta.env.VITE_APP_location_key;


class App extends Component {
  constructor() {
    super();
    this.state = {
      birminghamDisplayName: '',
      birminghamLon: '',
      birminghamLat: ''
    }
  }

  handleGetBirmingham = async () => {
    let result = await axios.get("https://us1.locationiq.com/v1/search?key=YOUR_ACCESS_TOKEN&q=SEARCH_STRING&format=json");
    let data = result.data;
    console.log(result.data[0].display_name);
    this.setState({
      birminghamDisplayName: data[0].display_name,
      birminghamLat: '',
      birminghamLon: ''
    })
    console.log("complete");
  }

}

render(); {
  return (
    <>
      <h2> {this.state.birminghamDisplayName} </h2>
      <button onClick={this.handleGetBirmingham}>Explore</button>

    </>);
}


export default App
