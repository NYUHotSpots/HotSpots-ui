import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import SpotCard from '../../components/Card/Card';

export default function Home(){
  const [component] = useState("img");
  const [height] = React.useState("140");
  const image = require('./images/nyu.jpg');
  // const [path, setPath] = useState('/rooms')
  const history = useHistory();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  function navigateToPage(path) {
    history.push(path);
  }

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
          <SpotCard
            component={component}
            height={height}
            image={image}
            onClick={() => navigateToPage('/rooms')} // todo change path
          />
        </div>
      </div>

    </div>
  );
}
