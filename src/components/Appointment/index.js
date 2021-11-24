import React from 'react';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";

export default function Appointment(props) {
  const { mode, transition, back } =
    useVisualMode(props.interview ? SHOW : EMPTY);
  function save(name, interviewer) {

    const interview = {

      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };
  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const deleteInterview = () => {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  };

  return <article className="appointment">

    {props.time && <Header time={props.time} />}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={confirmDelete}
    />}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
    {mode === SAVING && <Status message="SAVING" />}
    {mode === DELETE && <Status message="DELETING" />}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
      />
    )}
  </article>

};

