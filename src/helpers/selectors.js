export function getAppointmentsForDay(state, day) {
  const filteredAppointmentDay = state.days.filter(indivisualDay => indivisualDay.name === day);
  let appointments = [];
  if (filteredAppointmentDay.length > 0) {
    appointments = filteredAppointmentDay[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  const interviewObj = {
    student: interview.student,
  }

  interviewObj.interviewer = state.interviewers[interview.interviewer]

  return interviewObj;
}