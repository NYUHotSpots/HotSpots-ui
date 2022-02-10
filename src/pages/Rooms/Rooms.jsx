import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import RoomItem from '../../components/RoomItem/RoomItem';

import './rooms.css';

export default function Rooms() {
  const [rooms, setRooms] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [refresh, setRefresh] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  useEffect(() => {
    axios.get('https://demo-repo23.herokuapp.com/rooms/list') // Got To change to our own herokuapp locations list
      .then((response) => {     //Waits for the response of the .get, once it gets the values it does below
        console.log(response.data);
        if (response.data){
          setRooms(response.data);
        }
      })
      .catch(error => {       //If an error is thrown this catch puts up a warning instead
        console.log(error);
        setError(error);
      });
  }, [refresh])

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
        <div className="create-modal"> {/*Is used to create and input a new room*/}

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

      <div className="rooms-header">  {/*Displays Rooms and a back button (Not sure if its working)*/}
        <h1>Rooms</h1>
        <button
          onClick={() => history.push('/')}
          className="button"
        >
          {"<--"}Go Back Home
        </button>
      </div>

      {error && (
        <div className="rooms-error-box">
          <p>{error.toString()}</p>
        </div>
      )}

      <div className="rooms-list">  {/*Gets the rooms from the demo23 (need to change) also handles when no rooms are found*/}
        {rooms ? rooms.map((room, index) => (
          <RoomItem
            key={`${room.roomName}-${index}`}
            name={room.roomName}
            userCount={room.num_users}
          />
        )) : (
          <div className="rooms-empty">
            <p>Sorry there are no rooms right now... Come back later </p>
          </div>
        )}
      </div>

      <div>     {/*A button to add a room*/}
        <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Room </button>
      </div>
    </div>
  )
}
