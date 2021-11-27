import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    console.log(`id: ${id}`);
    console.log(`interview: ${JSON.stringify(interview)}`);
    console.log(`state: ${JSON.stringify(state)}}`);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = { // new state for updated appointments.
      ...state,
      appointments,
    };
    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then(() => updateSpots(newState));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
    };
    appointment.interview = null;

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newState = {
      ...state,
      appointments,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => updateSpots(newState, id));
  };
  //---Update spots function

  const updateSpots = (state) => {
    const day = state.days.find((day) => day.name === state.day);
    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const appointmentsForDay = day.appointments;

    let remainingSpots = 0;
    for (const appointment of appointmentsForDay) {
      if (state.appointments[appointment].interview === null) {
        remainingSpots += 1;
      }
    };

    const updatedSpots = { ...day, spots: remainingSpots };
    const days = [...state.days];
    days[dayIndex] = updatedSpots;

    setState({ ...state, days });
  };

  return { state, setDay, cancelInterview, bookInterview };
}