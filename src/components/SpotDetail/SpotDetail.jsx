import React from 'react';

import './spotdetail.css';

export default function SpotItem({name, image, address, capacity, availability, noise, temp, ambi, reviews}) {

  console.log(availability)

  console.log({availability}["availability"]["factorValue"])

  return (
    <div className="spot-details">

      <div className="title">
        <h1> {name} </h1>

        <p> {address} </p>
      </div>

      <div id="visual">
        <img src={image} alt="Location" width="300" height="300"/>
      </div>

      <div id="data">
        <h2>Availability: {availability.factorValue}</h2>

        <h2>Noise Level: {noise.factorValue}</h2>

        <h2>Ambience: {temp.factorValue}</h2>

        <h2>Temperature: {availability.factorValue}</h2>
      </div>

      <div id="clear"></div>

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