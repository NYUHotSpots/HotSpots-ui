import React from 'react';

import {useHistory} from 'react-router-dom';

import './spotdetail.css';

export default function SpotItem({name, image, address, capacity, availability, noise, temp, ambi, reviews}) {
  const history = useHistory();

  // For availability
  console.log(availability);
  if(availability <= 1){
    availability = "At Capacity";
  }
  else if (availability > 1 && availability <= 2){
    availability = "Crowded (limited seating)";
  }
  else if (availability > 2 && availability <= 3){
    availability = "Not too crowded";
  }
  else if (availability > 3 && availability <= 4){
    availability = "Many seats Available";
  }
  else{
    availability = "Too mant seats free";
  }

  // For Noise Level
  if(noise <= 1){
    noise = "Quiet";
  }
  else if (noise > 1 && noise <= 2){
    noise = "Some noise";
  }
  else if (noise > 2 && noise <= 3){
    noise = "Noisy";
  }
  else if (noise > 3 && noise <= 4){
    noise = "Unbearably loud";
  }
  else{
    noise = "Ruptured eardrum";
  }

  // For ambience
  if(ambi <= 1){
    ambi = "Chill";
  }
  else if (ambi > 1 && ambi <= 2){
    ambi = "Regular";
  }
  else if (ambi > 2 && ambi <= 3){
    ambi = "Neutral";
  }
  else if (ambi > 3 && ambi <= 4){
    ambi = "Busy";
  }
  else{
    ambi = "Serious Business";
  }

  // For tempature
  if(temp <= 1){
    temp = "Cold/ Chilly";
  }
  else if (temp > 1 && temp <= 2){
    temp = "Comfortable";
  }
  else if (temp > 2 && temp <= 3){
    temp = "warm";
  }
  else if (temp > 3 && temp <= 4){
    temp = "Flaming";
  }
  else{
    temp = "Burning";
  }

  console.log(capacity);

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
            <li>Capacity: {capacity}</li>
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
