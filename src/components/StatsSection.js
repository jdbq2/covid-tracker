import React from "react";
import StatsBox from "./StatsBox";
import "./sass/stats_section";
import numeral from "numeral";

function StatsSection(props) {
  return (
    <div className="statsSection">
      <StatsBox
        active={props.active === "cases"}
        name={"cases"}
        onClick={props.onClick}
        title="Covid Cases"
        cases={numeral(props.todayCases).format("0,0")}
        total={numeral(props.cases).format("0,0")}
        color={{ color: "DarkGoldenRod" }}
      />
      <StatsBox
        active={props.active === "recovered"}
        name={"recovered"}
        onClick={props.onClick}
        title="Recovered"
        cases={numeral(props.todayRecovered).format("0,0")}
        total={numeral(props.recovered).format("0,0")}
        color={{ color: "green" }}
      />
      <StatsBox
        active={props.active === "deaths"}
        name={"deaths"}
        onClick={props.onClick}
        title="Deaths"
        cases={numeral(props.todayDeaths).format("0,0")}
        total={numeral(props.deaths).format("0,0")}
        color={{ color: "red" }}
      />
    </div>
  );
}

export default StatsSection;
