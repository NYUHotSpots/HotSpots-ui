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
        onClick={() => navigateToPage('/login')}
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

      { /*
        - button to Add Review
        - can be changed to show in the Locations page instead
        - currently redirects to /rooms
      */}
      <button
        onClick={() => navigateToPage('/rooms')}
        className="page-button"
      >
        Add a Review
      </button> 

      { /*
        - button to Look at all the Reviews (Can be Change to just a room)
        - currently redirects to /rooms
      */}
      <button
        onClick={() => navigateToPage('/rooms')}
        className="page-button"
      >
        Check Reviews
      </button> 
    </div>
  );
};

