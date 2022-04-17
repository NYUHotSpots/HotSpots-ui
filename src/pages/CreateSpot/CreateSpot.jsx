import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from '@mui/material/Alert';

import "./createspot.css";

export default function CreateSpot() {
  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(false);
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const createSpot = (spotName, spotImage, spotAddress, spotCapacity) => {
    console.log("In createSpot function: ", spotName, spotImage, spotAddress, spotCapacity);
    const sendRequest = async (spotName, spotImage, spotAddress, spotCapacity) => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const body = {
          spotName: spotName,
          spotImage: spotImage,
          spotAddress: spotAddress,
          spotCapacity: spotCapacity,
        };

        const config = {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${accessToken}`,
            // "accept": "application/json"
          }
        };

        const response = await axios.post(
          `${apiServerUrl}/spots/create`,
          new URLSearchParams(body),
          config
        );

        const { data } = response;
        console.log(data);
        if (response.status === 200) {
          history.push('/submissionsuccess')
        }
      } catch (e) {
        console.log(e)
        console.log(e.message);
        setError(e.message)
      }
    };

    sendRequest(spotName, spotImage, spotAddress, spotCapacity);
  };

  return (
    <div className="content">
      <div className="rooms-header">
        <h1>Add a Spot</h1>
        <button onClick={() => history.push("/")} className="page-button">
          {"<-- "}Go Back Home
        </button>
      </div>
      
      {error ? <Alert severity="error">{error}</Alert> : null }
      <div className="contents">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const elements = e.target.elements;
            createSpot(elements.spotName.value, elements.spotImage.value, elements.spotAddress.value, elements.spotCapacity.value);
            // console.log(e.target.elements.spotAddress.value);
            // console.log(e.target.elements.username.value); // from elements property
            // console.log(e.target.username.value); // or directly
          }}
        >
          <label className="item-styling">
            {" "}
            <big>
              <b>Spot / Location Name: </b>
            </big>{" "}
          </label>
          <input type="text" name="spotName" placeholder="NYU Makerspace" />
          <br></br>
          <br></br>

          <label className="item-styling">
            {" "}
            <big>
              <b>Address: </b>
            </big>{" "}
          </label>
          <input
            type="text"
            name="spotAddress"
            placeholder="6 MetroTech Center"
          />
          <br></br>
          <br></br>

          <label className="item-styling">
            {" "}
            <big>
              <b>Capacity: </b>
            </big>{" "}
          </label>
          <input type="text" name="spotCapacity" placeholder="100" />
          <br></br>
          <br></br>

          <label className="item-styling">
            {" "}
            <big>
              <b>Image Link: </b>
            </big>{" "}
          </label>
          <input
            type="text"
            name="spotImage"
            placeholder="https://example.com/"
          />
          <br></br>
          <br></br>

          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
