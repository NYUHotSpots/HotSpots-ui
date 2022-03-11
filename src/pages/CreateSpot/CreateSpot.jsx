import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import './createspot.css';

export default function CreateSpot() {
  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  // function navigateToPage(path) {
  //   history.push(path);
  // }

  const createSpot = () => {
    const sendRequest = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {
            spotName: "",
            spotImage: "",
            spotAddress: "",
            spotCapacity: "",
          },
        };
        const response = await axios.post(
          `${apiServerUrl}/spots/create`,
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

  return (
    <div className="content">
      <div className="rooms-header">
        <h1>Add a Spot</h1>
        <button onClick={() => history.push('/')} className="page-button"> {"<-- "}Go Back Home </button>

        <button onClick={() => createSpot()} className="page-button"> Sample Button </button> 
        {/* don't know why button is clicking back to this page, is here to remove warning error*/}

      </div>


      <div className="contents">
        <form>
          <label className="item-styling"> <big><b>Spot / Location Name: </b></big> </label>
          <input type="text" name="Spot Name" placeholder="NYU Makerspace" /><br></br><br></br>

          <label className="item-styling"> <big><b>Address: </b></big> </label>
          <input type="text" name="address" placeholder="6 MetroTech Center" /><br></br><br></br>

          <label className="item-styling"> <big><b>Capacity: </b></big> </label>
          <input type="text" name="capacity" placeholder="100" /><br></br><br></br>

          <label className="item-styling"> <big><b>Image Link: </b></big> </label>
          <input type="text" name="img-link" placeholder="https://example.com/" /><br></br><br></br>
          

          
          <input className="submit-button" type="submit" value="Submit" />
        </form>

      </div>


    </div>
    

    
  );
}
