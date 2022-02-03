import React from 'react';
import {useHistory} from 'react-router-dom';

export default function Home(){
  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  return (
    <div className="content">
      <h1>Hotspots</h1>
      <div>
        <p className="quote">"Crowdsourcing study spaces for students by students"</p>
        <hr></hr>
        <hr></hr>
        <p className="dev-names">Tiffany Chan, Kevin Chen, Kevin Iza, Kathy Pan</p>
      </div>

      { 
        // button for Locations
      }
      <button
        onClick={() => navigateToPage('/rooms')}
        className="page-button"
      >
        View All Locations
      </button>

      { 
        // button for User login?
      }
      <button
        onClick={() => navigateToPage('/users')}
        className="page-button"
      >
        User Login
      </button> 

      { /*
        - button for User signup?
        - maybe we can split the pages where the user logs in and signs up
        - currently routes to the same place as User Login
      */}
      <button
        onClick={() => navigateToPage('/users')}
        className="page-button"
      >
        User SignUp
      </button> 
    </div>
  );
};

