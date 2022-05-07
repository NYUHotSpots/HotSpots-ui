import React, {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./updatespotinfo.css";

import { useParams } from "react-router";

export default function CreateSpot() {        // Update function name
  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();
  const [selectedFile, setSelectedFile] = useState();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  const { spotID } = useParams();
  const changeImage = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const updateSpot = (spotName, spotImage, spotImageUpload, spotAddress, spotCapacity) => {
    const sendRequest = async (spotName, spotImage, spotImageUpload, spotAddress, spotCapacity) => {
      try {
        const accessToken = await getAccessTokenSilently(); 

        const body = new FormData();
        body.append('spotName', spotName);
        body.append('spotImage', spotImage);
        body.append('spotImageUpload', spotImageUpload);
        body.append('spotAddress', spotAddress);
        body.append('spotCapacity', spotCapacity);
        body.append('spot_id', spotID)

        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          }
        };

        const response = await axios.put(
          `${apiServerUrl}/spots/update/${spotID}`,
          body,
          config
        );

        if(response.status === 200){
          history.push('/submissionsuccess')
        }

      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    sendRequest(spotName, spotImage, spotImageUpload, spotAddress, spotCapacity);
  };

  return (
    <div className="contentUSI">
      <div className="rooms-header">
        <h1>Update Spot</h1>
        <button onClick={() => history.goBack()} className="page-button">
          {"<-- "} Back
        </button>
      </div>

      <div className="instructions">
          <h3 className="instr-subheader">Instructions:</h3>
          <p>All input boxes must be filled out.</p>
          <p>If there is a category that you do not want to change, fill the input box with the original content.</p>
      </div>

      <div className="contents">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const elements = e.target.elements;
            updateSpot(elements.spotName.value, elements.spotImage.value, selectedFile, elements.spotAddress.value, elements.spotCapacity.value);
          }}
        >
          <div id="userInputs">
            <label className="input-sections">
              <h3> Update Spot / Location Name: </h3>
            </label>
            <input type="text" name="spotName" placeholder="NYU Makerspace" id="input-text"/>

            <label className="item-styling">
              <h3 id="input-subtitle">Update Address: </h3>
            </label>
            <input
              type="text"
              name="spotAddress"
              placeholder="6 MetroTech Center"
            />

            <label className="item-styling">
              <h3 id="input-subtitle">Update Capacity: </h3>
            </label>
            <input type="text" name="spotCapacity" placeholder="100" />

            <label className="item-styling">
              <h3 id="input-subtitle">Update Image Link: </h3>
            </label>
            <input
              type="text"
              name="spotImage"
              placeholder="https://example.com/"
            />
            <input 
            type="file"
            name="spotImageUpload"
            onChange={changeImage}
            />
          </div>
          
          <input className="submit-button" type="submit" value="Submit"/>
          
        </form> {/* END FORM */}
      </div>
    </div> // END DIV
  );
}
