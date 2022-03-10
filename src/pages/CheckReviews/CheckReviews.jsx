import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import RoomItem from '../../components/RoomItem/RoomItem';
import './checkreviews.css';


export default function CheckReviews() {
  function navigateToPage(path) {
    history.push(path);
  }

  const [reviews, setReviews] = useState(undefined);
  const [error, setError] = useState(undefined);
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  //const [refresh, setRefresh] = useState(0);
  // const [refresh] = useState(0);    // for testing, need to revert to OG later
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // still links to demo Rooms
    axios.get(`${apiServerUrl}/spot_reviews/${123}`) // Got To change to our own herokuapp locations list
      .then((response) => {     //Waits for the response of the .get, once it gets the values it does below
        console.log(response.data);
        if (response.data){
          setReviews(response.data);
        }
      })
      .catch(error => {       //If an error is thrown this catch puts up a warning instead
        console.log(error);
        setError(error);
      });
  })

  return (
    <div className="content">

      <div className="checkreviews-header">  {/*Displays reviews and a back button (Not sure if its working)*/}
        <h1>Reviews</h1>
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {error && (
        <div className="checkreviews-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="checkreviews-list">  {/*Gets the reviews from the demo23 (need to change) also handles when no reviews are found*/}
        {reviews ? reviews.map((room, index) => (
          
          <RoomItem
            key={`${room.roomName}-${index}`}
            name={room.roomName}
            userCount={room.num_users}
          />
          

        )) : (
          <div className="checkreviews-empty">
            <p>Sorry there are no reviews right now... Come back later </p>
          </div>
        )}
      </div>

      <div>     {/*A button to add a review*/}
        <button 
        onClick={() => navigateToPage('/users')}
        className="page-button"
        >
          Reroute to Users page
        </button> 
      
      </div>
    </div>
  )
}
  