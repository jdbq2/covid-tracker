import React from "react";
import "./sass/table.scss";
import numeral from "numeral";

function Chart(props) {
  function formatNumber(n) {
    n = String(n).replace(/\D/g, ",");
    return n === "" ? n : Number(n).toLocaleString();
  }
  const dataArray = [...props.tableData];
  const tableData = dataArray.sort((a, b) => b.active - a.active);
  return (
    <div className="table">
      <tr>
        <th>#</th>
        <th>Country</th>
        <th>Active Cases</th>
        <th> Total Cases</th>
        <th>Population</th>
      </tr>
      {tableData.map((country) => (
        <tr key={country.country}>
          <td>{tableData.indexOf(country) + 1} </td>
          <td>{country.country} </td>
          <td>{numeral(country.active).format("0a")} </td>
          <td>{numeral(country.cases).format("0a")} </td>
          <td>{numeral(country.population).format("0a")} </td>
        </tr>
      ))}
    </div>
  );
}
export default Chart;
