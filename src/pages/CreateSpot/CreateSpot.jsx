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
  const [selectedFile, setSelectedFile] = useState();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const changeImage = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const createSpot = (spotName, spotImage, spotImageUpload, spotAddress, spotCapacity) => {
    console.log("In createSpot function: ", spotName, spotImage, spotImageUpload.name, spotAddress, spotCapacity);
    const sendRequest = async (spotName, spotImage, spotImageUpload, spotAddress, spotCapacity) => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);

        const body = new FormData();
        body.append('spotName', spotName);
        body.append('spotImage', spotImage);
        body.append('spotImageUpload', spotImageUpload);
        body.append('spotAddress', spotAddress);
        body.append('spotCapacity', spotCapacity);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            "Authorization": `Bearer ${accessToken}`,
            // "accept": "application/json"
          }
        };

        const response = await axios.post(
          `${apiServerUrl}/spots/create`,
          body,
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

    sendRequest(spotName, spotImage, spotImageUpload, spotAddress, spotCapacity);
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
            createSpot(elements.spotName.value, elements.spotImage.value, selectedFile, elements.spotAddress.value, elements.spotCapacity.value);
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
              <h3>Image Link/Upload: </h3>
            </label>
            <input
              type="text"
              name="spotImage"
              placeholder="https://example.com/imagelinkaddress.jpg"
            />
            <input 
            type="file"
            name="spotImageUpload"
            onChange={changeImage}
            />
          </div>

          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
