import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import SpotDetail from '../../components/SpotDetail/SpotDetail';

import './spotinfo.css';

import { useParams } from 'react-router';

export default function Rooms() {
  const [spot, setSpot] = useState([]);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  const { spotID } = useParams();

  useEffect(() => {
    const getSpotDetails = () => {
      axios.get(`https://hotspotsapi.herokuapp.com/spots/${spotID}`)
        .then((response) => {
          console.log(response.data);
          setSpot(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log("Error caught");
          setError(error);
        });
    };

    getSpotDetails();

  }, [spotID]);

  if(isLoading){           // A way to wait for the response from axios before rendering the page
    return <div></div>         // returns an empty paragraph element
  }
  

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
    <div className="body">
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
        {<SpotDetail
          name={spot.spotName}
          image={spot.spotImage}
          address={spot.spotAddress}
          capacity={spot.spotCapacity}
          availability={spot.factorAvailability}
          noise={spot.factorNoiseLevel}
          temp={spot.factorTemperature}
          ambi={spot.factorAmbiance}
          reviews={spot.reviews}
        />}
        
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<-- "}Go Back Home
        </button>
      </div>

      <div>     {/*A button to add a room*/}
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Location </button>
      </div>

    </div> //body div
  )
}
