import React from 'react';

import './reviewitem.css';

export default function ReviewItem({title, dt, rating, text}) {   // dt is short for date and time
  return (
    <div id = "reviewItem">
      <h4>{title}</h4>
      <p>{dt}</p>
      <p>{rating}</p>
      <p>{text}</p>
    </div>
  );
}


