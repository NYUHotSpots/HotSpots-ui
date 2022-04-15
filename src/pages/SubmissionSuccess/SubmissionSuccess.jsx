import React from 'react';
import {useHistory} from 'react-router-dom';

import "./submissionsuccess.css";

export default function Home(){
  const history = useHistory();

  function navigateToPage(path) {
    history.push(path);
  }

  return (
    <div className="success">
      <h1>🎉 Submission SUCCESS!!! 🎉</h1>

      <div className="returnHome">
        <button onClick={() => history.push("/")} className="page-button" id="buttonColor">
          Return Home
        </button>
      </div>
    </div>
  );
};
