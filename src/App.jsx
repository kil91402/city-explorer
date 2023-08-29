'use strict',
import React { Component } from 'react';
import Movies from './Movies';
import WeatherDay from './WeatherDay';
import Movie from './Movie';
import axios from 'axios';
import { Image }  from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const location_key = import.meta.env.VITE_APP_location_key;
const WEATHER_API_KEY = import.meta.env.WEATHER_API_KEY;
const MOVIE_API = import.meta.env.MOVIE_API;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      locationDisplayName: '',
      locationLon: '',
      locationLat: '',
      locationMap: '',
      locationWeather: '',
      locationDate:'',
      locationDescripton:'',
      forecast: [],
      weather: [],
      movieData: [],
      error: null,
    };
  }

  handleExplore = async (event) => {
    event.preventDefault();
    try {
     let result = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${location_key}&q=${this.state.locationName}&format=json`
      );
      let data = result.data[0];
      this.setState({
        locationDisplayName: data.display_name,
        locationLat: data.lat,
        locationLon: data.lon,
        locationMap: `https://maps.locationiq.com/v3/staticmap?key=${location_key}&center=${data.lat},${data.lon}&zoom=15`,
        error: null,
      });
      let result2 = await axios.get(
        `http://localhost:3000/weather?lat=${data.lat}&lon=${data.lon}`,
      );
      
      data = result2.data;
      const weatherCast = data.map(item=> ({
        date: item.date,
        description: item.description,
      }))
        this.setState({
        forecast: weatherCast,
            
       }); 
       
       console.log("yes");
       let result3 = await axios.get(
        `http://localhost:3000/movies?query=${data.display_name}`,
      );
      

       data = result3.data;
       const movie = data.map(item=> ({
        title: item.title,
        overview: item.overview,
        imgURL: item.imgURL,
        release_date: item.release_date
       }))
       this.setState({
        movieData: movie,
       });
      
            
    } catch (error) {
      console.log(error);
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
          <Button type="submit">Explore!</Button>
        </form>
        {this.state.error ? (
          <div className="error">{this.state.error}</div>
        ) : (
          <><div className="main">
              <h2>{this.state.locationDisplayName}</h2>
              <h2>{this.state.locationLat}</h2>
              <h2>{this.state.locationLon}</h2>
              <h2>{this.state.locationDate}</h2>
              <ul> {this.state.forecast.map((item, index) => (<li key={index}>
                <strong>{item.date}:</strong> {item.description}
              </li>
              ))}</ul>
              {this.state.locationMap && <Image src={this.state.locationMap} alt="Location Map" />}
            </div><div className="main">
            <ul>
  {this.state.forecast.map((item, index) => (
    <WeatherDay key={index} date={item.date} description={item.description} />
  ))}
</ul>
            {this.state.movieData.length > 0 && (
  <div className="main">
    <h2>Movies</h2>
    <ul>
      {this.state.movieData.map((item, index) => (
        <li key={index}>
          <strong>{item.title}:</strong> {item.overview}
          <br />
          <img src={item.imgURL} alt={`Movie Poster for ${item.title}`} />
          <br />
          Release Date: {item.release_date}
        </li>
      ))}
    </ul>
    <ul>
  {this.state.movieData.map((item, index) => (
    <Movie
      key={index}
      title={item.title}
      overview={item.overview}
      imgURL={item.imgURL}
      release_date={item.release_date}
    />
  ))}
</ul>

  </div>
)}
</div>
</>
        )}
      </>
    );
  }
}

export default App;