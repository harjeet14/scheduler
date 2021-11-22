import React from 'react';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from './Form';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = "CREATE";

export default function Appointment(props) {
  const { mode, transition, back } =
    useVisualMode(props.interview ? SHOW : EMPTY);
  // let appResult = `${!props.time ? "no appointment" : "Appointment at 12pm"}`
  return <article className="appointment">
    {/* <Header time={props.time} />
    {props.interview ? <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer} /> :
      <Empty />
    } */}
    {props.time && <Header time={props.time} />}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show {...props.interview} />}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
  </article>

};

