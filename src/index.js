/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
//import RTL from "layouts/RTL.js";
import Login from "layouts/Login";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import StaffRegister from "layouts/StaffRegister";
import AdminLogin from "layouts/AdminLogin";
import { AuthProvider } from "hooks/AuthProvider";
import App from "./App";

//import Login from "layouts/Login.js";
//import StaffRegister from "layouts/staff/staffregister";

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
