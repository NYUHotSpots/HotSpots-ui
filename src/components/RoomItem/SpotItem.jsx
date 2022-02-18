import React from 'react';

import './spotitem.css';

export default function SpotItem({name, image, address}) {
  return (
    <div className="spot-item">
      <p> {name} </p>
      <p> {image} </p>
      <p> {address} </p>
    </div>
  );
}