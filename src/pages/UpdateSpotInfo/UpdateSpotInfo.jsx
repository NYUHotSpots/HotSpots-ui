import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./updatespotinfo.css";

export default function CreateSpot() {
  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  // function navigateToPage(path) {
  //   history.push(path);
  // }

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
            // "content-type": "application/x-www-form-urlencoded",
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
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    sendRequest(spotName, spotImage, spotAddress, spotCapacity);
  };

  return (
    <div className="content">
      <div className="rooms-header">
        <h1>Update Spot</h1>
        <button onClick={() => history.push("/")} className="page-button">
          {" "}
          {"<-- "}Go Back Home{" "}
        </button>

        {/* <button onClick={() => createSpot()} className="page-button"> createSpot() Button </button>  */}
        {/* don't know why button is clicking back to this page, is here to remove warning error
        I assume this is the submit button?
        */}
      </div>

      <div className="instructions">
          <p style={{color:"red"}}><b>Instructions:</b></p>
          <p>All input boxes must be filled out.<br></br>
            If there is a category that you do not want to change, fill the input box with the original content. 
          </p>
      </div>


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
              <b> Update Spot / Location Name: </b>
            </big>{" "}
          </label>
          <input type="text" name="spotName" placeholder="NYU Makerspace" />
          <br></br>
          <br></br>

          <label className="item-styling">
            {" "}
            <big>
              <b>Update Address: </b>
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
              <b>Update Capacity: </b>
            </big>{" "}
          </label>
          <input type="text" name="spotCapacity" placeholder="100" />
          <br></br>
          <br></br>

          <label className="item-styling">
            {" "}
            <big>
              <b>Update Image Link: </b>
            </big>{" "}
          </label>
          <input
            type="text"
            name="spotImage"
            placeholder="https://example.com/"
          />
          <br></br>
          <br></br>

          <input className="submit-button" type="submit" value="Submit Changes" />
        </form>
      </div>
    </div>
  );
}
