import React, { useState } from "react";
import "./sass/header.scss";

function Header(props) {
  return (
    <div className="header">
      <h1 className="header__title">Covid 19 Tracker</h1>
      <div className="header__dropdown">
        <select
          variant="outlined"
          value={props.value}
          onChange={props.handleFormChange}
        >
          <option key="Worldwide" value="Worldwide">
            Worldwide
          </option>
          {props.list.map((country) => (
            <option key={country.name} value={country.value}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default Header;
