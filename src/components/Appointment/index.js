import React from "react";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  let appResult = `${!props.time ? "no appointment" : "Appointment at 12pm"}`
  return <article
    className="appointment">
    {appResult}
  </article>


}