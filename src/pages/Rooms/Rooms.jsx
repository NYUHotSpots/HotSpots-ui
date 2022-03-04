import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import './rooms.css';

import { useParams } from 'react-router';

export default function Rooms() {
  const [spot, setSpot] = useState([]);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  const { spotID } = useParams();

  useEffect(() => {
    const getSpotDetails = () => {
      axios.get(`https://hotspotsapi.herokuapp.com/spot/${spotID}`)
        .then((response) => {
          console.log(response.data);
          setSpot(response.data);
        })
        .catch(error => {
          console.log("Error caught");
          setError(error);
        });
    };

    getSpotDetails();

  }, [spotID]);

  

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
        <div className="create-modal"> {/*Is the popup to add a new room (GOT to get rid of)*/}

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

      
      {error && (
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className = "spot_details">  {/* showing the spot details */}
        <div className="rooms-header">  {/*Displays the title "Locations" and a back button */}
          <h1>{spot.spotName}</h1>
          
          <button
            onClick={() => history.push('/')}
            className="button"
          >
            {"<-- "}Go Back Home
          </button>
        </div>
      </div>
      {/*<div className="rooms-list">
        {spot ? spot.map((spot) => (
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
      </div>*/}

           {/*Sets up the 'table' with details*/}
        <h3 className = "detail-subheaders"> Availability </h3>
        <span>tester</span>
        
        <h3 className = "detail-subheaders"> Noise Level </h3>

        <h3 className = "detail-subheaders"> Ambience </h3>

        <h3 className = "detail-subheaders"> Temperature </h3>
      
      <div>     {/*A button to add a room*/}
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Location </button>
      </div>

    </div> //Content div
  )
}
