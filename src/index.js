import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import Axios from "axios";

(async () => {
  try {
    const profile = Axios.get('/apis/v1/auth/profile')
  } catch (_) { }
  render(
    <Router>
      <App />
    </Router>
    , document.getElementById("root"));
})()