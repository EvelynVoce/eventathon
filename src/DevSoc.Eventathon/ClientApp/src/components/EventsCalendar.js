﻿import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../resources/events';
import axios from "axios";

import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);

const CreateEvent = (givenName, givenDescription, givenStart, givenEnd) => {
    const element = document.querySelector('#post-request .article-id');
    const article = {
        name: givenName,
        description: givenDescription,
        start: givenStart,
        end: givenEnd
    };
    axios.post('api/events', article).then(response => element.innerHTML = response.data.id);
}

export const EventsCalendar = () => {
    const [myEventsList, setEvents] = useState(events)
    const history = useHistory();
    
    const handleSelectSlot = useCallback(
        ({ start, end}) => {
            const title = window.prompt('Enter event name: ')
            const description = window.prompt('Enter event description: ')
            if (title) {
                setEvents((prev) => [...prev, { description, start, end, title}])
            }
            CreateEvent(title, description, start, end);
        },
        [setEvents]
    )

    const handleSelectEvent = useCallback(
        (event) => {
            history.push(
                {
                    pathname: "/attendance", 
                    state: {"givenID": event.id, "givenTitle": event.title,"givenDescription": event.description,
                        "givenStart": event.start, "givenEnd": event.end}
                }
            )
        },[]
    )
    
    return (
        <div>
            <h1><u>Our Events!</u></h1>
            <p>Welcome to the DevSoc events calendar. Here you can see all scheduled events. 
               If you're a committee member you can also schedule new events from this page. 
               If you can schedule events and you're not a committtee member this is a bug.
               Be a good person and just don't use this immense power.</p>
            <hr></hr>
            <Calendar
                localizer={localizer} 
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
            />
        </div>
    );
};