import React from "react";
import "./sass/stats_box.scss";

function StatsBox(props) {
  return (
    <div
      className={`statsBox ${props.active && "statsBox--selected"}`}
      onClick={props.onClick}
      data-name={props.name}
    >
      <h1 className="statsBox__title" data-name={props.name}>
        {props.title}
      </h1>
      <h3 className="statsBox__info" data-name={props.name}>
        <span
          className="statsBox__info__number"
          style={props.color}
          data-name={props.name}
        >
          {props.cases}
        </span>
      </h3>
      <h3 className="statsBox__info" data-name={props.name}>
        Total: {props.total}
      </h3>
    </div>
  );
}

export default StatsBox;
