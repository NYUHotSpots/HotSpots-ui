import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import SpotItem from '../../components/SpotItem/SpotItem';

import './rooms.css';

import { useParams } from 'react-router';

export default function Rooms() {
  const [spots, setSpots] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  const { spotID } = useParams();


  useEffect(() => {
    console.log('Before Axios, spotID = ' + spotID);
    axios.get('https://hotspotsapi.herokuapp.com/spot/list') // Gets the spots from our api
    //axios.get('https://hotspotsapi.herokuapp.com/spot/${spot_id}') // link for specific spot, doesn't work

      .then((response) => {     //Waits for the response of the .get, once it gets the values it does below
        console.log(response.data);
        console.log('getting values'); // Remove later, testing
        if (response.data){
          console.log('api sent data');// Remove later, testing
          setSpots(response.data);
          console.log("Retrieved spots from DB", spots);
        }
        console.log('At the end');// Remove later, testing
      })
      .catch(error => {       //If an error is thrown this catch puts up a warning instead
        console.log(error);
        console.log('You didnt get the value RIPS'); // Remove later, testing
        setError(error);
      });
  }, [refresh, spotID, spots]);

  const getSpotDetails = () => {
    axios.get(`https://hotspotsapi.herokuapp.com/spot/${spotID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCreateRoom = () => {
    axios.post(`https://demo-repo23.herokuapp.com/rooms/create/${newRoomName}`)  // Got To change to our own area of adding locations
      .then(() => {       //Waits for a response from the post request
        setIsModalOpen(false);
        setRefresh(refresh + 1);
      })
      .catch(error => {       //Catches any potential errors from the post requests and handles it
        setError(error);
        console.log(error);       
      })
  }

  return (
    <div className="content">
      {isModalOpen &&
        <div className="create-modal"> {/*Is the popup to add a new room (GOT TO Change text)*/}

          <input
            className="room-input"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />

          <div className="create-actions">
            <button className="button" onClick={handleCreateRoom}>Create New Room</button>
            <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
          </div>

        </div>
      }

      <div className="rooms-header">  {/*Displays the title "Locations" and a back button */}
        <h1>[Spot Location Name]</h1>
        
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<-- "}Go Back Home
        </button>
      </div>

      {error && (      /* Creates the Error box when there are no rooms */
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="rooms-list">  {/*Gets the spots also handles when no rooms are found*/}
        {spots ? spots.map((spot, index) => (
          <SpotItem
            key={`${spot.spotName}-${index}`}
            name={spot.spotName}
            image= {spot.spotImage}
            address={spot.spotAddress}
          />
        )) : (
          <div className="rooms-empty">
            <p>Sorry there are no Locations right now... Come back later </p>
          </div>
        )}
      </div>

           {/*Sets up the 'table' with details*/}
        <h3 classname = "detail-subheaders"> Availability </h3>
        <span>tester</span>
        
        <h3 classname = "detail-subheaders"> Noise Level </h3>

        <h3 classname = "detail-subheaders"> Ambience </h3>

        <h3 classname = "detail-subheaders"> Temperature </h3>
      


      <div>     {/*A button to add a room*/}
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Location </button>
      </div>

    </div> //Content div
  )
}
