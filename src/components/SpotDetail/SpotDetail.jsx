import React from 'react';

import {useHistory} from 'react-router-dom';

import './spotdetail.css';

export default function SpotItem({name, image, address, capacity, availability, noise, temp, ambi, reviews}) {
  const history = useHistory();

  return (
    <div className="spot-details">

      <header>
        <div id="title">
          <h1> {name} </h1>

          <p> {address} </p>
        </div>
        <div id ="home_but">
          <button
            onClick={() => history.push('/')}
            className="button"
            id="h_button"
            >
            {"<-- "}Go Back Home
          </button>
        </div>
      </header>

      <div id="outline">
        <div id="visual">
          <img id="loc_img" src={image} alt="Location" width="300" height="300"/>
        </div>

        <div id="data">
          <ul>
            <li>Availability: {availability}</li>
            <li>Noise Level: {noise}</li>
            <li>Ambience: {ambi}</li>
            <li>Temperature: {temp}</li>
          </ul>
        </div>
      </div>

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
