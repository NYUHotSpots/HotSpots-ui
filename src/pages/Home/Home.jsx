import React, {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import SpotCard from '../../components/Card/Card';   

import axios from 'axios';

export default function Home(){
  //const [component] = useState("img");
  //const [height] = React.useState("140");
  //const image = require('./images/nyu.jpg');
  // const [path, setPath] = useState('/rooms')
  //const history = useHistory();

  const [spots, setSpots] = useState(undefined);
  const [,setError] = useState(undefined);

  const [refresh] = useState(undefined);

  const history = useHistory();

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  function navigateToPage(path) {
    history.push(path);
  }

  useEffect(() => {
    axios.get('https://hotspotsapi.herokuapp.com/spot') // Gets the spots from our api
      .then((response) => {     //Waits for the response of the .get, once it gets the values it does below
        console.log(response.data);
        console.log('getting values'); // Remove later, testing
        if (response.data){
          console.log('api sent data');// Remove later, testing
          setSpots(response.data);
        }
        console.log('At the end');// Remove later, testing
      })
      .catch(error => {       //If an error is thrown this catch puts up a warning instead
        console.log(error);
        console.log('You didnt get the value RIPS'); // Remove later, testing
        setError(error);
      });
  }, [refresh])

  return (
    <div className="content">

    <div className="rooms-header">  {/*Displays the title "Locations" and a back button */}
      <h1>Hotspots</h1>
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()} className="page-button">Log In / Sign Up</button>
      )}
    </div>

      <div className="intro">
        <p className="quote">"Crowdsourcing study spaces for students by students"</p>
        <p className="dev-names">Tiffany Chan, Kevin Chen, Kevin Iza, Kathy Pan</p>
      </div>
      <div className = "button-container">
        <button
            onClick={() => navigateToPage('/rooms')}
            className="page-button"
            >
            View All Spots
        </button>
        <button
            onClick={() => navigateToPage('/rooms')} // todo change path
            className="page-button"
            >
            Add New Spot
        </button>
      </div>

      
      <div className="grid-container"> 
        <div className="grid-item" onClick={() => navigateToPage('/rooms')}>
          {spots ? spots.map((spot, index) => (
            <SpotCard
              component={spot.component}
              height={spot.height}
              image={spot.image}
              name={spot.name}
              address={spot.address}
              onClick={() => navigateToPage('/rooms')} // todo change path
            />
          )) : (
            <div className="rooms-empty">
              <p>Sorry there are no Locations right now... Come back later </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

