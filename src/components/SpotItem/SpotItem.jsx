import React from 'react';

import './spotitem.css';

export default function SpotItem({name, image, address}) {
  return (
    <div className="spot-item">
      <h1> {name} </h1>
      {<img src={image} alt="Spot in the makerspace" />}
      <p> {address} </p>
    </div>
  );
}