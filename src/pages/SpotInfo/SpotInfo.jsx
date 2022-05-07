import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import SpotDetail from "../../components/SpotDetail/SpotDetail";

import "./spotinfo.css";

import { useParams } from "react-router";
import { useJwt } from "react-jwt";

export default function Rooms() {
  const [spot, setSpot] = useState([]);

  const [setError] = useState(undefined);

  const [isLoading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useState("");
  const { decodedToken, isExpired } = useJwt(accessToken);

  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
  const deleteSpot = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.delete(
        `${apiServerUrl}/spots/delete/${spotID}`,
        config
      );
      const { data } = response;

      if (response.status === 200) {
        history.push("/");
      }
    } catch (e) {
      console.log(JSON.stringify(e.message, null, 2));
    }
  };

  function navigateToPage(path) {
    history.push(path);
  }

  const { spotID } = useParams();

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setAccessToken(accessToken);
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    getToken();

    const getSpotDetails = () => {
      axios
        .get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
          setSpot(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error caught");
          setError(error);
        });
    };

    getSpotDetails();
  }, [setError, spotID]);
  
  // Wait for response from axios before rendering the page
  if (isLoading) {  
    return <div></div>; // returns an empty div
  }

  return (
    <div className="body">
      <div className="spot_details">      {/* showing the spot details */}
        {
          <SpotDetail
            name={spot.spotName}
            image={spot.spotImage}
            address={spot.spotAddress}
            capacity={spot.spotCapacity}
            availability={spot.factorAvailability}
            noise={spot.factorNoiseLevel}
            temp={spot.factorTemperature}
            ambi={spot.factorAmbiance}
            reviews={spot.reviews}
          />
        }
        <footer>
          <button
            key={spot["_id"]["$oid"]}
            onClick={() => navigateToPage(`/createreview/${spotID}`)}
            className="page-button"
          >
            Add a Review
          </button>

          <button
          onClick={() => navigateToPage(`/spot_review/read/${spotID}`)}
          className="page-button"
        >
          View Reviews
        </button>

        {decodedToken != null &&
        decodedToken.permissions.indexOf("admin:full-access") != -1 ? (
          <button
            onClick={() => history.push(`/updatespotinfo/${spotID}`)}
            className="page-button"
            id="adminOnly"
          >
            Update Spot Details
          </button>
        ) : null}

        <button
          onClick={() => navigateToPage(`/updatespotfactors/${spotID}`)}
          className="page-button"
          id="adminOnly"
        >
          Update Spot Factors
        </button>

        {decodedToken != null &&
        decodedToken.permissions.indexOf("admin:full-access") != -1 ? (
          <button
            onClick={() => deleteSpot()}
            className="page-button"
            id="adminOnlyDelete"
          >
            Delete This Spot
          </button>
        ) : null}
        </footer>
      </div>
    </div>
  );
}
