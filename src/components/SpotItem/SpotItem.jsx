import React from 'react';

import './spotitem.css';

export default function SpotItem({name, image, address}) {
  return (
    <div className="spot-item">
      <p> {name} </p>
      {<img src={image} alt="Spot in the makerspace" />}
      <p> {address} </p>
    </div>
  );
}