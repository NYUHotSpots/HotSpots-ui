//import React, {useEffect, useState} from 'react';
import React, { useEffect, useState } from "react"; // html For debugging, return to OG later
//import axios from 'axios';    // htmlFor debugging, uncomment later
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";

import "./createreview.css";

export default function CreateReview() {

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const history = useHistory();
  const [setError] = useState(undefined);

  const [spotName, setSpotName] = useState("Spot Name");
  const [spotAddress, setSpotAddress] = useState("Spot Address");

  const { spotID } = useParams();

  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getSpotDetails = () => {
      axios
        .get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
          console.log(response.data);  // Test value delete

          setSpotName(response.data.spotName);
          setSpotAddress(response.data.spotAddress);
        })
        .catch((error) => {
          console.log("Error caught");
          setError(error);
        });
    };

    getSpotDetails();
  }, [setError, spotID]);

  const createReview = (reviewTitle, reviewText, reviewRating) => {
    const sendRequest = async (
      spotID,
      reviewTitle,
      reviewText,
      reviewRating
    ) => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const body = {
          spotID: spotID,
          reviewTitle: reviewTitle,
          reviewText: reviewText,
          reviewRating: reviewRating,
        };

        const config = {
          headers: {
            // "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
            // "accept": "application/json"
          },
        };

        const response = await axios.post(
          `${apiServerUrl}/spot_review/create`,
          new URLSearchParams(body),
          config
        );

        const { data } = response;
        console.log(data);      // ?? Delete log
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    sendRequest(spotID, reviewTitle, reviewText, reviewRating);
  };


  return (
    <body>
      <div className="createreview-header">       {/*Displays the title "Locations" and a back button */}
        <h1>Write a Review</h1>

        <button onClick={() => history.push("/")} className="page-button">     {/* Change button to be back button not back home*/}
          {"<-- "}Go Back Home{" "}
        </button>
      </div>

      <div id ="spot_info">
        <h1>{spotName}</h1>
        <h2>{spotAddress}</h2>
      </div>

      <div className="createreview-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createReview(reviewTitle, reviewText, reviewRating);
          }}
        >
          <div id ="rev_title">
            <h2>Review Title: </h2>

            <input
              type="text"
              name="Review Title"
              placeholder="Great Location!"
              onChange={(e) => setReviewTitle(e.target.value)}
            />
          </div>

          <div id="rating">
            <h2>Rating out of 5: </h2>

            <input
              type="number"
              min="0"
              max="5"
              name="rating"
              placeholder="5"
              onChange={(e) => {
                console.log(Number(e.target.value));          // Do we need??
                setReviewRating(Number(e.target.value));
              }}
            />
          </div>

          <div id = "comments">
            <h2>Comments: </h2>
            
            <textarea onChange={(e) => setReviewText(e.target.value)}></textarea>

          </div>

          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>

      
    </body> //Content div
  );
}
