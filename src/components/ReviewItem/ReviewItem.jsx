import React from 'react';

import './reviewitem.css';

export default function ReviewItem({title, dt, rating, text}) {   // dt is short for date and time
  return (

    <div id = "reviewItem">

      <h4>{title}</h4>
      <p>{dt}</p>

      <div id = "rate">
        <p className="bold">Rating: </p>
        <p>{rating}</p>
      </div>

      <div id = "text">
        <p className="bold">Comment: </p>
        <p>{text}</p>
      </div>

    </div>
  );
}


