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
          }}
        >
          <div id="userInputs">
            <label className="item-styling">
              <h3>Spot / Location Name: </h3>
            </label>
            <input type="text" name="spotName" placeholder="NYU Makerspace" />

            <label className="item-styling">
              <h3>Address: </h3>
            </label>
            <input
              type="text"
              name="spotAddress"
              placeholder="6 MetroTech Center"
            />

            <label className="item-styling">
            <h3>Capacity: </h3>
            </label>
            <input type="text" name="spotCapacity" placeholder="100" />

            <label className="item-styling">
              <h3>Image Link: </h3>
            </label>
            <input
              type="text"
              name="spotImage"
              placeholder="https://example.com/imagelinkaddress.jpg"
            />
          </div>

          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
