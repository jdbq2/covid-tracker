import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import App from "./components/App";
require("babel-core/register");
require("babel-polyfill");

const containter = document.getElementById("app");

ReactDOM.render(<App />, containter);
