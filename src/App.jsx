import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const location_key = import.meta.env.VITE_APP_location_key;


class App extends Component {
  constructor() {
    super();
    this.state = {
      birminghamDisplayName: '',
      birminghamLon: '',
      birminghamLat: '',
      birminghamMap: "https://maps.locationiq.com/v3/staticmap?key=${location_key}a&center=33.5206824,-86.8024326&zoom=15"
    }
  }

  handleGetBirmingham = async () => {
    let result = await axios.get(`https://us1.locationiq.com/v1/search?key=${location_key}&q=birmingham&format=json`);
    let data = result.data;
    console.log(result.data[1].display_name);
    this.setState({
      birminghamDisplayName: data[1].display_name,
      birminghamLat: data[1].lat,
      birminghamLon: data[1].lon,

    })
    console.log("complete");
  }



  render() {
    return (
      <>
        <h2> {this.state.birminghamDisplayName} </h2>
        <Image src="https://maps.locationiq.com/v3/staticmap?key=pk.4431ba91d3c057a8d70476e8d0bd430a&center=33.5206824,-86.8024326&zoom=15" />
        <h2>  {this.state.birminghamLat} </h2>
        <h2>  {this.state.birminghamLon} </h2>

        <Button onClick={this.handleGetBirmingham}>Explore</Button>

      </>);
  };
}

export default App
