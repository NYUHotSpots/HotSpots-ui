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
    <div className="content">
      <div className="createreview-header">
        {" "}
        {/*Displays the title "Locations" and a back button */}
        <h1>Update the Spot Factors</h1>
        <button onClick={() => history.push("/")} className="page-button">
          {" "}
          {"<-- "}Go Back Home{" "}
        </button>
      </div>

      <h2>{spot.spotName}</h2>
      <h3>{spot.spotAddress}</h3>

      <div className="createreview-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
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
                    <p>
                      <strong>
                        <big>{spotFactorTypes[factorType].display_name}:</big>
                      </strong>
                    </p>

                    {spotFactorTypes[factorType].pick_list.map(
                      (tupleOption) => {
                        return (
                          <>
                            <input
                              type="radio"
                              id={factorType + tupleOption[1]}
                              name={factorType}
                              value={tupleOption[1]}
                              checked
                            ></input>
                            <label for="html"> {tupleOption[0]}</label>
                            <br></br>
                          </>
                        );
                      }
                    )}

                    {/* <input
                      type="radio"
                      id="quiet"
                      name={factorType}
                      value="1"
                      checked
                    ></input>
                    <label for="html"> Quiet (silent / near silent)</label>
                    <br></br>

                    <input
                      type="radio"
                      id="someNoise"
                      name={factorType}
                      value="2"
                    ></input>
                    <label for="html">
                      {" "}
                      Some noise (whispering to normal speech)
                    </label>
                    <br></br>
                    <input
                      type="radio"
                      id="noise"
                      name={factorType}
                      value="3"
                    ></input>
                    <label for="html"> Noisy (very loud)</label>
                    <br></br>
                    <input
                      type="radio"
                      id="noise"
                      name={factorType}
                      value="4"
                    ></input>
                    <label for="html"> Unbearably loud</label>
                    <br></br>

                    <input
                      type="radio"
                      id="noise"
                      name={factorType}
                      value="5"
                    ></input>
                    <label for="html"> Ruptured eardrum </label>
                    <br></br> */}

                    <br></br>
                  </>
                );
              })
            : null}

          {/* // Hard Coded Factors */}
          {/* <p>
            <strong>
              <big>Availability:</big>
            </strong>
          </p>
          <input
            type="radio"
            id="noAvail"
            name="availability"
            value="1"
            checked
          ></input>
          <label for="noAvail"> At capacity (No seats)</label>
          <br></br>
          <input
            type="radio"
            id="limitedAvail"
            name="availability"
            value="2"
          ></input>
          <label for="limitedAvail"> Crowded (limited seating)</label>
          <br></br>
          <input
            type="radio"
            id="someAvail"
            name="availability"
            value="3"
          ></input>
          <label for="someAvail"> Not too crowded (Some seats available)</label>
          <br></br>
          <input
            type="radio"
            id="manyAvail"
            name="availability"
            value="4"
          ></input>
          <label for="manyAvail"> Many seats</label>
          <br></br>
          <input
            type="radio"
            id="tooManyAvail"
            name="availability"
            value="5"
          ></input>
          <label for="manyAvail"> Too many seats free</label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Noise Level:</big>
            </strong>
          </p>
          <input type="radio" id="quiet" name="noise" value="1" checked></input>
          <label for="html"> Quiet (silent / near silent)</label>
          <br></br>
          <input type="radio" id="someNoise" name="noise" value="2"></input>
          <label for="html"> Some noise (whispering to normal speech)</label>
          <br></br>
          <input type="radio" id="noise" name="noise" value="3"></input>
          <label for="html"> Noisy (very loud)</label>
          <br></br>
          <input type="radio" id="noise" name="noise" value="4"></input>
          <label for="html"> Unbearably loud</label>
          <br></br>
          <input type="radio" id="noise" name="noise" value="5"></input>
          <label for="html"> Ruptured eardrum </label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Temperature:</big>
            </strong>
          </p>
          <input type="radio" id="cold" name="temp" value="1" checked></input>
          <label for="html"> Cold / Chilly</label>
          <br></br>
          <input type="radio" id="comfortable" name="temp" value="2"></input>
          <label for="html"> Comfortable</label>
          <br></br>
          <input type="radio" id="warm" name="temp" value="3"></input>
          <label for="html"> Warm / Hot</label>
          <br></br>
          <input type="radio" id="warm" name="temp" value="4"></input>
          <label for="html"> Flaming </label>
          <br></br>
          <input type="radio" id="warm" name="temp" value="5"></input>
          <label for="html"> Burning </label>
          <br></br>
          <br></br>

          <p>
            <strong>
              <big>Ambiance:</big>
            </strong>
          </p>
          <input type="radio" id="calm" name="ambi" value="1" checked></input>
          <label for="html"> Chill </label>
          <br></br>
          <input type="radio" id="busy" name="ambi" value="2"></input>
          <label for="html"> Regular</label>
          <br></br>
          <input type="radio" id="busy" name="ambi" value="3"></input>
          <label for="html"> Neutral</label>
          <br></br>
          <input type="radio" id="busy" name="ambi" value="4"></input>
          <label for="html"> Busy</label>
          <br></br>
          <input type="radio" id="busy" name="ambi" value="5"></input>
          <label for="html"> Serious/Business</label>
          <br></br>
          <br></br>
          
           */}
           
          <br></br>
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div> //Content div
  );
}
