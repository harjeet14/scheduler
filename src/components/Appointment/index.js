import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {

  // let appResult = `${!props.time ? "no appointment" : "Appointment at 12pm"}`
  return <article className="appointment">
    <Header time={props.time} />
    {props.interview ? <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer} /> :
      <Empty />
    }
  </article>

};

