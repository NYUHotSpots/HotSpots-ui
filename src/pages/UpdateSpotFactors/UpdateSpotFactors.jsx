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
  //const [refresh, setRefresh] = useState(0);
  //const [isModalOpen, setIsModalOpen] = useState(false);

  //const [newReviewName, setNewReviewName] = useState('');
  //const [newReviewName] = useState("");
  function navigateToPage(path) {
    history.push(path);
  }

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
          // console.log(typeof response.data)
          // console.log(spotFactorTypes.keys());
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
      } catch (e) {
        console.log(JSON.stringify(e.message, null, 2));
      }
    };

    // console.log(
    //   factorAvailability,
    //   factorNoiseLevel,
    //   factorTemperature,
    //   factorAmbiance
    // );

    sendRequest(
      factorAvailability,
      factorNoiseLevel,
      factorTemperature,
      factorAmbiance
    );
  };

  // const history = useHistory();
  return (
    <body>
      <div id="cr-header">
        <div className="createreview-header">
          {" "}
          {/*Displays the title "Locations" and a back button */}
          <h1>Update the Spot Factors</h1>
          <div className="">
            {" "}
            {/*Return Home button*/}
            <button
              onClick={() => navigateToPage(`/spots/${spot["_id"]["$oid"]}`)}
              className="page-button"
            >
              {"<--"} Back
            </button>
          </div>
        </div>

        <h2>{spot.spotName}</h2>
        <h3>{spot.spotAddress}</h3>
      </div>

      <div className="createreview-input">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevents from submitting forms?? Do we need?
            // console.log(
            //   document.querySelector('input[name="availability"]:checked').value
            // );
            // console.log(e);
            // const elements = e.target.elements;
            // console.log(elements.hello);
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
                                checked
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
