import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import SpotCard from '../../components/Card/Card';

export default function Home(){
  const [component, setComponent] = useState("img");
  const [height, setHeight] = React.useState("140");
  const image = require('./images/nyu.jpg');
  const [path, setPath] = useState('/rooms')
  const history = useHistory();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  function navigateToPage(path) {
    history.push(path);
  }

  return (
    <div className="content">
      {isAuthenticated ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}

      <h1>Hotspots</h1>
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
        <div className="grid-item" onClick={() => navigateToPage('/rooms')}>
          <SpotCard
            component={component}
            height={height}
            image={image}
            onClick={() => navigateToPage('/rooms')} // todo change path
          />
        </div>
        <div className="grid-item" onClick={() => navigateToPage('/rooms')}>
          <SpotCard
            component={component}
            height={height}
            image={image}
            onClick={() => navigateToPage('/rooms')} // todo change path
          />
        </div>
        <div className="grid-item" onClick={() => navigateToPage('/rooms')}>
          <SpotCard
            component={component}
            height={height}
            image={image}
            onClick={() => navigateToPage('/rooms')} // todo change path
          />
        </div>
        <div className="grid-item" onClick={() => navigateToPage('/rooms')}>
          <SpotCard
            component={component}
            height={height}
            image={image}
            onClick={() => navigateToPage('/rooms')} // todo change path
          />
        </div>
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
