'use strict'
import React from 'react';
import { Card } from 'react-bootstrap';

const Movie = ({ title, overview, imgURL, release_date }) => {
  return (
    <Card>
      <Card.Img variant="top" src={imgURL} alt={`Poster for ${title}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{overview}</Card.Text>
        <Card.Text>Release Date: {release_date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Movie;
