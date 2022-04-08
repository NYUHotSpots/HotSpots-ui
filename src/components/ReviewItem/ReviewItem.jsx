import React from 'react';

import './reviewitem.css';

export default function ReviewItem({spotName, spotAddress}) {
  return (
    <div className="room-item">
      <p> {spotName} </p>
      
      {/*<p> {userCount} </p>*/}
    </div>
  );
}


