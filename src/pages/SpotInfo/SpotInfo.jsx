import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import SpotDetail from '../../components/SpotDetail/SpotDetail';

import './spotinfo.css';

import { useParams } from 'react-router';

export default function Rooms() {
  const [spot, setSpot] = useState([]);
  //const [setError] = useState(undefined);
  const [setError] = useState(undefined);

  //const [refresh, setRefresh] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [newRoomName, setNewRoomName] = useState('');

  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

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

  }, [setError, spotID]);

  if(isLoading){           // A way to wait for the response from axios before  rendering the page
    return <div></div>         // returns an empty paragraph element
  }

  return (
    <div className="body">

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

        <footer>
          <button key={spot["_id"]["$oid"]} onClick={() => navigateToPage(`/createreview`)} className="page-button"> Add a Review </button> 

          <button onClick={() => history.push('/createreview')} className="page-button"> Add a Review </button>

          {/*       Used to pass information to the next page
          <div key={spot["_id"]["$oid"]} className="grid-item" onClick={() => navigateToPage(`/spots/${spot["_id"]["$oid"]}`)}>
          */}

          <button
              onClick={() => history.push('/')}
              className="button"
            >
              {"<-- "}Go Back Home
          </button>
        </footer>
        
      </div>

      <button
        onClick={() => history.push('/updatespotinfo')}
        className="page-button"
        >
        Update Spot Details
      </button>

    </div> //body div
  )
}
