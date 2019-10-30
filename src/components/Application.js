import React, { useState, useEffect} from "react";
import axios from 'axios';

import Appointment from "components/Appointment";
import DayList from "components/DayList";
import "components/Application.scss";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";




export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (day) => {
    return setState({...state, day})
  }
  
  const bookInterview = function(id, interview){
    console.log(id,interview);

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }


    axios.put(`/api/appointments/${id}`, {
      interview
    }).then(setState({...state, appointments}))
  }


  


  useEffect(() => {
    Promise.all([
      axios('/api/days'),
      axios('/api/appointments'),
      axios('/api/interviewers')
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
  }, [])

  const interviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(app => {
    const interview = getInterview(state, app.interview);


      return (
            <Appointment
              key={app.id}
              id={app.id}
              time={app.time}
              interview={interview}
              interviewers={interviewers}
              bookInterview={bookInterview}
            />
      )
  })

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
          days={state.days}
          day={state.day}
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

        {schedule}
        <Appointment key="last" time="3pm"/>        


      </section>
    </main>
  );
}

