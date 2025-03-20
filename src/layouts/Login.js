import React from "react";
import LogComponent from "./staff/logComponent";
import "./staff/login.css";

export default function Login() {
  return (
    <div className="container">
      <div className="column">
        <div className="card">
          <LogComponent />
        </div>
      </div>
    </div>
  );
}
