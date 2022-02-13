import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import SpotCard from '../../components/Card/Card';

export default function Home(){
  const [component, setComponent] = useState("img");
  const [height, setHeight] = React.useState("140");
  const image = require('./images/nyu.jpg');
  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  return (
    <div className="content">
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
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
        <SpotCard
          component={component}
          height={height}
          image={image}
        />
      </div>

    </div>
  );
};

