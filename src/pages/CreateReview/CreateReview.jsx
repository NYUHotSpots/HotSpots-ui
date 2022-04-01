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

      {/* <div className="contents">                               ??? What does this do?
        <button onClick={() => createReview()} className="page-button">
          {" "}
          createReview() Button{" "}
        </button>
      </div> */}

      {/*
            {isModalOpen &&
                <>
                <input
                    className="createreview-input"
                    placeholder="Review Name"
                    value={newReviewName}
                    onChange={(e) => newReviewName(e.target.value)}
                />

                <div className="create-actions">
                <button className="button" onClick={handleCreateReview}>Create New Room</button>
                <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
                </div>
                </>
            }
            */}

      {/* <input
        className="createreview-input"
        placeholder="Review Title"
        value={newReviewName}
        onChange={(e) => setNewReviewName(e.target.value)}
      /> */}

      {/* <p>
            <strong>
              <big>Availability:</big>
            </strong>
          </p>
          <input
            type="radio"
            id="noAvail"
            name="availability"
            value="1"
          ></input>
          <label htmlFor="noAvail"> At capacity (No seats)</label>
          <br></br>
          <input
            type="radio"
            id="limitedAvail"
            name="availability"
            value="2"
          ></input>
          <label htmlFor="limitedAvail"> Crowded (limited seating)</label>
          <br></br>
          <input
            type="radio"
            id="someAvail"
            name="availability"
            value="3"
          ></input>
          <label htmlFor="someAvail">
            {" "}
            Not too crowded (Some seats available)
          </label>
          <br></br>
          <input
            type="radio"
            id="manyAvail"
            name="availability"
            value="4"
          ></input>
          <label htmlFor="manyAvail"> Many seats</label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Noise Level:</big>
            </strong>
          </p>
          <input type="radio" id="quiet" name="noise" value="1"></input>
          <label htmlFor="html"> Quiet (silent / near silent)</label>
          <br></br>
          <input type="radio" id="someNoise" name="noise" value="2"></input>
          <label htmlFor="html">
            {" "}
            Some noise (whispering to normal speech)
          </label>
          <br></br>
          <input type="radio" id="noise" name="noise" value="3"></input>
          <label htmlFor="html"> Noisy (very loud)</label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Temperature:</big>
            </strong>
          </p>
          <input type="radio" id="cold" name="temp" value="1"></input>
          <label htmlFor="html"> Cold / Chilly</label>
          <br></br>
          <input type="radio" id="comfortable" name="temp" value="2"></input>
          <label htmlFor="html"> Comfortable</label>
          <br></br>
          <input type="radio" id="warm" name="temp" value="3"></input>
          <label htmlFor="html"> Warm / Hot</label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Ambiance:</big>
            </strong>
          </p>
          <input type="radio" id="calm" name="ambi" value="1"></input>
          <label htmlFor="html"> Calm </label>
          <br></br>
          <input type="radio" id="busy" name="ambi" value="2"></input>
          <label htmlFor="html"> Busy</label>
          <br></br> */}

    </body> //Content div
  );
}
