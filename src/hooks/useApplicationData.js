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
      return {...state.days.spots, ...action.value}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const [state, dispatch] = useReducer(reducer, initial);




  const setDay = (day) => {
    return dispatch({type: SET_DAY, value: {day}})
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
    return axios.put(`/api/appointments/${id}`, {
      interview
    }).then(dispatch({type: SET_INTERVIEW, value: {appointments}}))
      
     // .then(()=>getSpots());
  }



  const cancelInterview = function(id){
    
    return axios.delete(`/api/appointments/${id}`, {
      interview: null
    }).then(dispatch({type: SET_INTERVIEW, value: null}))
      

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