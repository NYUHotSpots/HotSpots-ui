import React from 'react';

import './spotdetail.css';

export default function SpotItem({name, image, address, capacity, availability, noise, temp, ambi, reviews}) {

  console.log(availability)

  console.log({availability}["availability"]["factorValue"])

  return (
    <div className="spot-details">
      <h1> {name} </h1>

      <p> {address} </p>
      
      <img src={image} alt="Location" width="300" height="300"/>

      <h2>Availability:</h2>

      <h2>Noise Level</h2>

      <h2>Ambience</h2>

      <h2>Temperature</h2>


      {/*
        Capacity

        factorAvailability": {
          "factorDate": "2022-03-03",
          "factorValue": 0,
          "factorNumOfInputs": 0

        factorNoiseLevel": {
        "factorDate": "2022-03-03",
        "factorValue": 0,
        "factorNumOfInputs": 0

      "factorTemperature": {
        "factorDate": "2022-03-03",
        "factorValue": 0,
        "factorNumOfInputs": 0

      "factorAmbiance": {
        "factorDate": "2022-03-03",
        "factorValue": 0,
        "factorNumOfInputs": 0
      
        Reviews
      */}
    </div>
  );
}