export function getAppointmentsForDay(state, day) {
  const filteredAppointmentDay = state.days.filter(indivisualDay => indivisualDay.name === day);
  let appointments = [];
  if (filteredAppointmentDay.length > 0) {
    appointments = filteredAppointmentDay[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
}