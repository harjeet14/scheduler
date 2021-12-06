import React from 'react';
import "components/Appointment/styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
//display all appointments
export default function Appointment(props) {
  //if appoinment is booked, display appointment otherwise empty
  const { mode, transition, back } =
    useVisualMode(props.interview ? SHOW : EMPTY);
  //save func pass interview data to the bookInterview function
  function save(name, interviewer) {

    const interview = {

      student: name,
      interviewer
    };
    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  };
  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const deleteInterview = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };
  const editInterview = () => {
    transition(EDIT);
  }
  // console.log(`props.interview.interviewer: ${props.interview.interviewer}`);
  return <article className="appointment"
    data-testid="appointment" >

    {props.time && <Header time={props.time} />}
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={confirmDelete}
      onEdit={editInterview}
    />}
    {/* show the empty form to create appointment */}
    {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
    {mode === EDIT && (<Form
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
    />)}
    {/* show the pre-filled form to edit the appointment */}
    {mode === SAVING && <Status message="SAVING" />}
    {mode === DELETE && <Status message="DELETING" />}
    {mode === CONFIRM && (
      <Confirm
        message="Are you sure you would like to delete?"
        onConfirm={deleteInterview}
        onCancel={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error message="Could not cancel appointment" onClose={back} />
    )}
    {mode === ERROR_SAVE && (
      <Error message="Could not save appointment" onClose={back} />
    )}

  </article>

};

