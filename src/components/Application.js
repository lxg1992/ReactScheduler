import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

import Appointment from "components/Appointment";
import DayList from "components/DayList";
import "components/Application.scss";






export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios('/api/days')
      .then(response => {
        setDays(response.data);
      })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={days}
          day={day}
          setDay={setDay}  
        />
      </nav>
      <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        <Fragment>
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )}
        )}
        <Appointment key="last" time="3pm"/>        
        </Fragment>

      </section>
    </main>
  );
}

