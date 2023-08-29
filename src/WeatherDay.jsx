'use strict';
import React from 'react';

const WeatherDay = ({ date, description }) => {
  return (
    <li>
      <strong>{date}:</strong> {description}
    </li>
  );
};

export default WeatherDay;
