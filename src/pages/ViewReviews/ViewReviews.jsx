import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import { useParams } from 'react-router';

import ReviewItem from '../../components/ReviewItem/ReviewItem.jsx';
import './viewreviews.css';


export default function CheckReviews() {
  function navigateToPage(path) {
    history.push(path);
  }

  const [spot, setSpot] = useState([]);
  const { spotID } = useParams();

  const [reviews, setReviews] = useState(undefined);
  const [error, setError] = useState(false);
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const history = useHistory();

  useEffect(() => {     // gets SpotInfo
    const getSpotDetails = () => {
      axios
        .get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
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
        console.log("Review:");
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
    <div id = "crBody">
      <div className="vr-header">
        <h1>Reviews</h1>
        <button onClick={() => history.goBack()} className="page-button">
          {"<-- "} Back
        </button>
      </div>

      <div id = "spotinfo">
        <h2>{spot.spotName}</h2>
        <h3>{spot.spotAddress}</h3>
      </div>

      <div id='add-rev'>
        <button 
          onClick={() => navigateToPage(`/createreview/${spotID}`)}
          className="page-button">
            Add a Review
        </button>
      </div>

      {error && (
        <div className="checkreviews-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div id="reviewsList">
        {reviews ? reviews.map((review) => (
          console.log(review.reviewText),
          <ReviewItem
            title = {review.reviewTitle}
            dt = {review.reviewCreation}
            rating = {review.reviewRating}
            text = {review.reviewText}
          />
          

        )) : (
          <div className="checkreviews-empty">
            <p>Sorry there are no reviews right now...</p>
          </div>
        )}
      </div>

    </div>
  )
}