//import React, {useEffect, useState} from 'react';
import React, {useState} from 'react';  // for debugging, return to OG later
//import axios from 'axios';    // for debugging, uncomment later
import {useHistory} from 'react-router-dom';  // for debugging, uncomment later

import './createreview.css';


export default function CreateReview() {
    //const [refresh, setRefresh] = useState(0);
    //const [isModalOpen, setIsModalOpen] = useState(false);

    //const [newReviewName, setNewReviewName] = useState('');
    const [newReviewName] = useState('');

    const history = useHistory();
    return (
        <div className="content">
            <div className="createreview-header">  {/*Displays the title "Locations" and a back button */}
                <h1>Write a Review</h1>
                <button
                    onClick={() => history.push('/')}
                    className="button"
                >
                    {"<--"}Go Back Home
                </button>
            </div>

            {/*
            {isModalOpen &&
                <>
                <input
                    className="createreview-input"
                    placeholder="Review Name"
                    value={newReviewName}
                    onChange={(e) => newReviewName(e.target.value)}
                />

                <div className="create-actions">
                <button className="button" onClick={handleCreateReview}>Create New Room</button>
                <button className="button" onClick={() => setIsModalOpen(false)}> Cancel </button>
                </div>
                </>
            }
            */}

            <input
                className="createreview-input"
                placeholder="Review Name"
                value={newReviewName}
                onChange={(e) => newReviewName(e.target.value)}
            />
            
            
        </div> //Content div
    )

}


        