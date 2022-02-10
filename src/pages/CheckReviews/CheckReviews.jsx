//import React, {useEffect, useState} from 'react';
import React, {useState} from 'react';  // for debugging, return to OG later
//import axios from 'axios';    // for debugging, uncomment later
//import {useHistory} from 'react-router-dom';    // for debugging, uncomment later

import './checkreviews.css';


export default function CheckReviews() {
  //const [refresh, setRefresh] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const history = useHistory();

    return(
        <div>
            <div>
                <button className="page-button" onClick={() => setIsModalOpen(true)}> Add New Room </button>
            </div>
        </div>


    )

  }