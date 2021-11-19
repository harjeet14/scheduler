import React from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   }, 
//   {`
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png",
// }
//   }
// },
// {
//   id: 3,
//   time: "2pm",
//   interview: {
//     student: "David Claveau",
//     interviewer: {
//       id: 1,
//       name: "Sven Jones",
//       avatar: "https://i.imgur.com/twYrpay.jpg",
//     }
//   }
// },
//   {
//     id: 4,
//     time: "3pm"
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Caitlin Ing",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   }

// ];
export default function Application() {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // const dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const appointments = getAppointmentsForDay(state, state.day);
  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        // key={appointment.id}
        // {...appointment}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  })

  axios.get("/api/days")
    .then(res => {
      console.log("something inside funmction");
    })

  useEffect(() => {
    console.log("use:");

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(response => {
        console.log(`response 0 ${response[0]}`);
        console.log(`response 1 ${response[1]}`);
        setState(prev => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data

        }))

      });
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
        {appointmentList}
        < Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
