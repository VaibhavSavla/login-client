import './index.css';
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import AuthService from "./services/auth.service";

(async () => {
  const user = { isAuthenticated: false, profile: null }
  try {
    const profile = await AuthService.profile()
    if (profile.status === 200) {
      user.isAuthenticated = true
      user.profile = profile.data
    }
  } catch (_) { }
  console.log(user)
  render(
    <Router>
      <App user={user} />
    </Router>
    , document.getElementById("root"));
})()