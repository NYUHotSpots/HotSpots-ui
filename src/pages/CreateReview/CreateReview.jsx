//import React, {useEffect, useState} from 'react';
import React, { useState } from "react"; // for debugging, return to OG later
//import axios from 'axios';    // for debugging, uncomment later
import { useHistory } from "react-router-dom";
import axios from "axios";
//import { useParams } from 'react-router';

import "./createreview.css";

export default function CreateReview() {
  //const [refresh, setRefresh] = useState(0);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //const [newReviewName, setNewReviewName] = useState('');
  const [newReviewName] = useState("");
  const history = useHistory();
  //const [spot, setSpot] = useState([]);
  //const [isLoading, setLoading] = useState(true);
  //const [setError] = useState(undefined);

  //const { spotID } = useParams();

  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  /*
  useEffect(() => {
    const getSpotDetails = () => {
      axios.get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
          console.log(response.data);
          setSpot(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log("Error caught");
          setError(error);
        });
    };

    getSpotDetails();

  }, [setError, spotID]);

  */

  const createReview = () => {
    const sendRequest = async () => {
      try {
        const config = {
          body: {
            spotID: "",
            reviewTitle: "",
            reviewText: "",
            reviewRating: "",
          },
        };
        const response = await axios.post(
          `${apiServerUrl}/spot_review/create`,
          config
        );

        const { data } = response;
        console.log(data);
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    sendRequest();
  };

  console.log("before return");

  // const history = useHistory();
  return (
    <div className="content">
      {console.log("hi")}
      <div className="createreview-header">
        {" "}
        {/*Displays the title "Locations" and a back button */}
        <h1>Write a Review</h1>
        <button onClick={() => history.push('/')} className="page-button"> {"<-- "}Go Back Home </button>
      </div>

      <h2>Location Name</h2>
      <h3>Location Address</h3>

      <div className="contents">
        <button onClick={() => createReview()} className="page-button"> createReview() Button </button> 
      </div>

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

      <input
        className="createreview-input"
        placeholder="Review Title"
        value={newReviewName}
        onChange={(e) => newReviewName(e.target.value)}
      />

      <div className="createreview-input">
        <form>
          <label className="item-styling"> <big><b>Review Title: </b></big> </label>
          <input type="text" name="Review Title" placeholder="Great Location!" /><br></br><br></br>

          <label className="item-styling"> <big><b>Rating out of 5: </b></big> </label>
          <input type="text" name="rating" placeholder="5" /><br></br><br></br>

          
          <p><strong><big>Availability:</big></strong></p>
          <input type="radio" id="noAvail" name="availability" value="1"></input>
          <label for="noAvail"> At capacity (No seats)</label><br></br>
          <input type="radio" id="limitedAvail" name="availability" value="2"></input>
          <label for="limitedAvail"> Crowded (limited seating)</label><br></br>
          <input type="radio" id="someAvail" name="availability" value="3"></input>
          <label for="someAvail"> Not too crowded (Some seats available)</label><br></br>
          <input type="radio" id="manyAvail" name="availability" value="4"></input>
          <label for="manyAvail"> Many seats</label><br></br><br></br>
          
          <p><strong><big>Noise Level:</big></strong></p>
          <input type="radio" id="quiet" name="noise" value="1"></input>
          <label for="html"> Quiet (silent / near silent)</label><br></br>
          <input type="radio" id="someNoise" name="noise" value="2"></input>
          <label for="html"> Some noise (whispering to normal speech)</label><br></br>
          <input type="radio" id="noise" name="noise" value="3"></input>
          <label for="html"> Noisy (very loud)</label><br></br><br></br>

          <p><strong><big>Temperature:</big></strong></p>
          <input type="radio" id="cold" name="temp" value="1"></input>
          <label for="html"> Cold / Chilly</label><br></br>
          <input type="radio" id="comfortable" name="temp" value="2"></input>
          <label for="html"> Comfortable</label><br></br>
          <input type="radio" id="warm" name="temp" value="3"></input>
          <label for="html"> Warm / Hot</label><br></br><br></br>

          <p><strong><big>Ambiance:</big></strong></p>
          <input type="radio" id="calm" name="ambi" value="1"></input>
          <label for="html"> Calm </label><br></br>
          <input type="radio" id="busy" name="ambi" value="2"></input>
          <label for="html"> Busy</label><br></br>


          
          <br></br><br></br>
          <label> <big><b>Comments: </b></big> </label>
          <textarea></textarea><br></br><br></br>

          
          

          
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>


    </div> //Content div
  );
}
