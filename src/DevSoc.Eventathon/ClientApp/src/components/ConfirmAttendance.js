﻿import React from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";

export const ConfirmAttendance = () => {
    const history = useHistory();
    
    const givenID = history.location.state.givenID
    const givenTitle = history.location.state.givenTitle
    const givenDescription = history.location.state.givenDescription
    const givenStart = history.location.state.givenStart
    const givenEnd = history.location.state.givenEnd
    
    console.log(history.location.state)
    
    const SendAttendance = () => {
        const article = {
            userID: 107, // Arbitrarily chosen until user accounts are created
            eventID: givenID,
            name: givenTitle,
        };
        axios.post('api/attendance', article).then(response => response.status === 200);
    }

    return (
        <div className="my-3">
            <h1><u>Event!</u></h1>
            <ul>
                <li> Event ID: {givenID}</li>
                <li> Title: {givenTitle}</li>
                <li> Description: {givenDescription}</li>
                <li> Start: {givenStart.toString()}</li>
                <li> End: {givenEnd.toString()}</li>
            </ul>
            <button className="btn btn-primary" onClick={SendAttendance}>Register Attendance</button>
            
        </div>
    );
}