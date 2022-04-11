import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { useParams } from 'react-router';

import ReviewItem from '../../components/ReviewItem/ReviewItem';
import './viewreviews.css';


export default function CheckReviews() {
  function navigateToPage(path) {
    history.push(path);
  }

  const [spot, setSpot] = useState([]);
  const { spotID } = useParams();

  const [reviews, setReviews] = useState(undefined);
  const [error, setError] = useState(undefined);
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  //const [refresh, setRefresh] = useState(0);
  // const [refresh] = useState(0);    // for testing, need to revert to OG later
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {     // gets SpotInfo
    const getSpotDetails = () => {
      axios
        .get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
          console.log(response.data);
          setSpot(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.log("Error caught", error);
          setError(error);
        });
    };

    getSpotDetails();
  }, [])


  useEffect(() => {     // gets reviews info
    axios.get(`${apiServerUrl}/spot_review/read/${spotID}`)
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
  }, [])



  return (
    <body>
      <div className="checkreviews-header">  {/*Displays reviews and a back button (Not sure if its working)*/}
        <h1>Reviews</h1>
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      <h2>{spot.spotName}</h2>
      <h3>{spot.spotAddress}</h3>
      <br></br><br></br>

      {error && (
        <div className="checkreviews-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="checkreviews-list">  {/*Gets the reviews from the demo23 (need to change) also handles when no reviews are found*/}
        {reviews ? reviews.map((room, index) => (
          
          <ReviewItem
            //key={`${room.roomName}-${index}`}
            name={room.roomName}
            //userCount={room.num_users}
          />
          

        )) : (
          <div className="checkreviews-empty">
            <p>Sorry there are no reviews right now... Come back later </p>
          </div>
        )}
      </div>
      

      <br></br><br></br>
      <div className="checkreviews-header">     {/*Return Home button*/}
        <button 
        onClick={() => navigateToPage(`/spots/${spot["_id"]["$oid"]}`)}
        className="page-button"
        >
          {"<--"}  Back
        </button> 
      </div>

    </body> /* END DIV */
  )
}