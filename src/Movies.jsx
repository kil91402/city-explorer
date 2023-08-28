import React from "react";
import { Card, CardDeck } from "react-bootstrap";

const MOVIE_API = import.meta.env.MOVIE_API;

const Movies = ({ movieData }) => {
  return (
    <div className="main">
      <h2>Movies</h2>
      <CardDeck>
        {movieData.map((item, index) => (
          <Card key={index}>
            <Card.Img
              variant="top"
              src={item.imgURL}
              alt={`Poster for ${item.title}`}
            />
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.overview}</Card.Text>
              <Card.Text>Release Date: {item.release_date}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
};

export default Movies;