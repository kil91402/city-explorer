import React, { Component } from 'react';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

const location_key = import.meta.env.VITE_APP_location_key;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationDisplayName: '',
      locationLon: '',
      locationLat: '',
      locationMap: `https://maps.locationiq.com/v3/staticmap?key=${location_key}&center=${this.state.locationLon},${this.state.locationLat}&zoom=15`
    };
  }

  handleGetlocation = async () => {
    let result = await axios.get(`https://us1.locationiq.com/v1/search?key=${location_key}&q=${this.state.locationName}&format=json`);
    let data = result.data[0]; 
    this.setState({
      locationDisplayName: data.display_name,
      locationLat: data.lat,
      locationLon: data.lon,
      locationMap: `https://maps.locationiq.com/v3/staticmap?key=${location_key}&center=${data.lon},${data.lat}&zoom=15`
    });
    console.log("complete");
  }

  handleChange = (event) => {
    this.setState({
      locationName: event.target.value
    });
  }

  handleExplore = async (event) => {
    event.preventDefault();
    let results = await axios.get(`https://us1.locationiq.com/v1/search?key=${location_key}&q=${this.state.locationName}&format=json`);
    let data = results.data[0]; 
    this.setState({
      locationDisplayName: data.display_name,
      locationLat: data.lat,
      locationLon: data.lon,
      locationMap: `https://maps.locationiq.com/v3/staticmap?key=${location_key}&center=${data.lon},${data.lat}&zoom=15`
    });
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleExplore}>
          <label>
            Location Name:
            <input type="text" value={this.state.locationName} onChange={this.handleChange} />
          </label>
          <button type="submit">Explore</button>
        </form>
        <div className="main">
          <h2>{this.state.locationDisplayName}</h2>
          <h2>{this.state.locationLat}</h2>
          <h2>{this.state.locationLon}</h2>
          {this.state.locationMap && <Image src={this.state.locationMap} alt="Location Map" />}
        </div>
      </>
    );
  };
}

export default App;
