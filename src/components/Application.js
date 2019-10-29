import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

import Appointment from "components/Appointment";
import DayList from "components/DayList";
import "components/Application.scss";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Lolwut",
      interviewer: {
        id:2,
        name:"Based Interviewer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Abraham Lincoln",
      interviewer:{
        id:3,
        name:"George Washington",
        avatar:"https://i.imgur.com/twYrpay.jpg"
      }
    }
  }
];


export default function Application(props) {
  const [day, setDay] = useState("Monday");

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

