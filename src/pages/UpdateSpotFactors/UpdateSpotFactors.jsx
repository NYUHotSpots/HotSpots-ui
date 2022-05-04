import { useEffect, useState } from "react";
//import React, { useState } from "react"; // for debugging, return to OG later
import React from "react"; // for debugging, return to OG later
import axios from "axios"; // for debugging, uncomment later
import { useHistory } from "react-router-dom";
//import axios from "axios";
import { useParams } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

import "./updatespotfactors.css";

export default function CreateReview() {
  const [spot, setSpot] = useState([]);
  const history = useHistory();

  const [spotFactorTypes, setSpotFactorTypes] = useState({});

  const { getAccessTokenSilently } = useAuth0();

  const { spotID } = useParams();

  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    const getSpotDetails = () => {
      axios
        .get(`${apiServerUrl}/spots/${spotID}`)
        .then((response) => {
          console.log(response.data);
          setSpot(response.data);
        })
        .catch((error) => {
          console.log("Error caught", error);
        });
    };
    const getSpotFactorTypes = () => {
      axios
        .get(`${apiServerUrl}/spot_factor_types/get`)
        .then((response) => {
          console.log(response.data);
          setSpotFactorTypes(response.data);
        })
        .catch((error) => {
          console.log("Error caught", error);
        });
    };

    getSpotDetails();
    getSpotFactorTypes();
  }, []);

  const updateSpotFactorReview = (
    factorAvailability,
    factorNoiseLevel,
    factorTemperature,
    factorAmbiance
  ) => {
    const sendRequest = async (
      factorAvailability,
      factorNoiseLevel,
      factorTemperature,
      factorAmbiance
    ) => {
      try {
        const accessToken = await getAccessTokenSilently();

        const body = {
          factorAvailability: factorAvailability,
          factorNoiseLevel: factorNoiseLevel,
          factorTemperature: factorTemperature,
          factorAmbiance: factorAmbiance,
        };

        const config = {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.put(
          `${apiServerUrl}/spot_factors/update/${spotID}`,
          new URLSearchParams(body),
          config
        );

        const { data } = response;
        console.log(data);
        if (response.status === 200) {
          history.push('/submissionsuccess')
        }
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    sendRequest(
      factorAvailability,
      factorNoiseLevel,
      factorTemperature,
      factorAmbiance
    );
  };

  return (
    <body>
      <div id="cr-header">
        <div className="createreview-header"> 
          <h1>Update the Spot Factors</h1>
          <div className="">
            <button onClick={() => history.goBack()} className="page-button">
            {"<-- "}Go Backs
            </button>
          </div>
        </div>

        <h2>{spot.spotName}</h2>
        <h3>{spot.spotAddress}</h3>
      </div>

      <div className="createreview-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSpotFactorReview(
              document.querySelector('input[name="availability"]:checked')
                .value,
              document.querySelector('input[name="noise"]:checked').value,
              document.querySelector('input[name="temp"]:checked').value,
              document.querySelector('input[name="ambi"]:checked').value
            );
          }}
        >
          {/* // Dynamic HATEOAS Factors */}
          {spotFactorTypes
            ? Object.keys(spotFactorTypes).map((factorType) => {
                return (
                  <>
                    <div id="sel">
                      <h2>{spotFactorTypes[factorType].display_name}:</h2>

                      {spotFactorTypes[factorType].pick_list.map(
                        (tupleOption) => {
                          return (
                            <div>
                              <input
                                type="radio"
                                id={factorType + tupleOption[1]}
                                name={factorType}
                                value={tupleOption[1]}
                                //checked
                              ></input>
                              <label for={factorType + tupleOption[1]}>
                                {tupleOption[0]}
                              </label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </>
                );
              })
            : null}
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </body>
  );
}
