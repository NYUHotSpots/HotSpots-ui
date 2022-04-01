//import React, {useEffect, useState} from 'react';
//import React, { useState } from "react"; // for debugging, return to OG later
import React, { } from "react"; // for debugging, return to OG later
//import axios from 'axios';    // for debugging, uncomment later
import { useHistory } from "react-router-dom";
//import axios from "axios";

import "./updatespotfactors.css";

export default function CreateReview() {
  //const [refresh, setRefresh] = useState(0);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //const [newReviewName, setNewReviewName] = useState('');
  //const [newReviewName] = useState("");
  const history = useHistory();

  //const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  /*
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
  */

  // const history = useHistory();
  return (
    <div className="content">
      <div className="createreview-header">
        {" "}
        {/*Displays the title "Locations" and a back button */}
        <h1>Update the Spot Factors</h1>
        <button onClick={() => history.push('/')} className="page-button"> {"<-- "}Go Back Home </button>
      </div>

      <h2>Location Title</h2>
      <h3>Location Address</h3>

      <div className="createreview-input">
        <form>
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
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>


    </div> //Content div
  );
}