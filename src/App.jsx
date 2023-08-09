import React, { Component } from 'react';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

const location_key = import.meta.env.VITE_APP_location_key;
const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationDisplayName: '',
      locationLon: '',
      locationLat: '',
      locationMap: '',
      error: null,
    };
  }

  handleExplore = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${location_key}&q=${this.state.locationName}&format=json`
      );
      const data = result.data[0];
      this.setState({
        locationDisplayName: data.display_name,
        locationLat: data.lat,
        locationLon: data.lon,
        locationMap: `https://maps.locationiq.com/v3/staticmap?key=${location_key}&center=${data.lat},${data.lon}&zoom=15`,
        error: null,
      });
      result = await axios.get(
        `http://localhost:3000/weather?&${req.query.data.lat},${req.query.data.lon}&key=${WEATHER_API_KEY}`,
      );

    } catch (error) {
      this.setState({
        error: error.response.status + ' ' + error.response.data.error,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      locationName: event.target.value,
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleExplore}>
          <label>
            Location Name:
            <input type="text" value={this.state.locationName} onChange={this.handleChange} />
          </label>
          <button type="submit">Explore!</button>
        </form>
        {this.state.error ? (
          <div className="error">{this.state.error}</div>
        ) : (
          <div className="main">
            <h2>{this.state.locationDisplayName}</h2>
            <h2>{this.state.locationLat}</h2>
            <h2>{this.state.locationLon}</h2>
            {this.state.locationMap && <Image src={this.state.locationMap} alt="Location Map" />}
          </div>
        )}
      </>
    );
  }
}

export default App;
