

export function getAppointmentsForDay(state, theDay) {
  const filteredDays = state.days.filter(day => day.name === theDay);
  if(!filteredDays[0]){
    return [];
  }
  const daysArray = filteredDays[0].appointments;
  const retArray = [];
  for(let appNum of daysArray){
    retArray.push(state.appointments[appNum])
  }
  return retArray;
  
}

export function getInterview(state, interview) {
  let interviewObj = null;
  if (interview) {
    interviewObj = {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return interviewObj;

}