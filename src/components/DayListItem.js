import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  const formatSpots = function () {
    let spotRemaining;
    if (props.spots === 0) {
      spotRemaining = "no spots remaining"
    }
    else if (props.spots > 0) {
      spotRemaining = `${props.spots} ${props.spots === 1 ? "spot" : "spots"} remaining`
    }

    return spotRemaining;
  }
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day" >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>

    </li>
  );
}