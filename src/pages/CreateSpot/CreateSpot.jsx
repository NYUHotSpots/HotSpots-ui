import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {useHistory} from 'react-router-dom';
import axios from "axios";

export default function Home(){
  const history = useHistory();

  const { getAccessTokenSilently } = useAuth0();
  const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

  function navigateToPage(path) {
    history.push(path);
  }

  const createSpot = () => {
    const sendRequest = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log(accessToken);
        
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: {

          }
        }
        const response = await axios.post(`${apiServerUrl}/spots/create`, config);

        const { data } = response;
        console.log(data);
      } catch (e) {
        console.log(JSON.stringify( e.message , null, 2 ));
      }
    };
  
    sendRequest();
  };

  return (
    <div className="content">
      <h1>🤗 SWE React Demo </h1>
      <p> Hello from class </p>
      <div>
        <p className="quote">"A list is only as strong as its weakest link"</p>
        <p className="quote-author">- Donald Knuth</p>
      </div>
      <button
        onClick={() => createSpot()}
        className="page-button"
      >
        Home
      </button>
    </div>
  );
};
