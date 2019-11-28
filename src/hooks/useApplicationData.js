import {useEffect, useReducer} from 'react';
import axios from 'axios';

export default function useApplicationData(){

  const initial = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }



  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      return {...state,...action.value}
    }
    case SET_SPOTS: {
      return {...state, ...action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const [state, dispatch] = useReducer(reducer, initial);

function getDayFromAppointment(id) {
  let dayId = 0;
  for (let i = 0; i <= 25; i += 5) {
    if (i < id) {
      dayId++
    } else {
      return dayId
    }
  }
}



  const setDay = (day) => {
    return dispatch({type: SET_DAY, value: {day}})
  }


  
  const bookInterview = function(id, interview){
    const dayId = getDayFromAppointment(id);

    let spots;

    if(!state.appointments[id].interview){
      spots = state.days[dayId - 1].spots - 1;
    } else {
      spots = state.days[dayId - 1].spots;
    }

    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    let days = state.days.map((item, index) => {
      if (index !== dayId - 1){
        return item
      }
      return {
        ...item,
        spots
      }
    })
    return axios.put(`/api/appointments/${id}`, {
      interview
    })
    .then(dispatch({type: SET_INTERVIEW, value: {appointments}}))
    .then(dispatch({type: SET_SPOTS, value: {days}}))
      
     // .then(()=>getSpots());
  }



  const cancelInterview = function(id){
    const dayId = getDayFromAppointment(id);

    let spots = state.days[dayId - 1].spots + 1;
    
    let days = state.days.map((item, index) => {
      if (index !== dayId - 1){
        return item
      }
      return {
        ...item,
        spots
      }
    })

    
    return axios.delete(`/api/appointments/${id}`, {
      interview: null
    })
    .then(dispatch({type: SET_INTERVIEW, value: null}))
    .then(dispatch({type: SET_SPOTS, value: {days}}))

      


      
      

  }



  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
        dispatch({type: SET_APPLICATION_DATA, value:{days: all[0].data, appointments: all[1].data, interviewers: all[2].data}})
      })
  }, [])

  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }





}