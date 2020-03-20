import React, { useState, useEffect } from "react";
import { Lock, Person } from "@material-ui/icons";

type ILoginProps = {
  setLoggedIn: (isLoggedIn: boolean) => void;
};

function Login({ setLoggedIn }: ILoginProps) {
  useEffect(() => {});
  return (
    <div id="login-container">
      <div className="login-item">
        <form onSubmit={e => console.log(e)} className="form form-login">
          <div className="form-field">
            <Person />
            <span className="hidden">Username</span>
            <input
              id="login-username"
              type="text"
              className="form-input"
              placeholder="Username"
              required
            />
          </div>

          <div className="form-field">
            <Lock />
            <span className="hidden">Password</span>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="Password"
              required
            />
          </div>

          <div className="form-field">
            <input type="submit" value="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

// <div id="login-container">
// <input className="login-input" placeholder="login"></input>
// <input className="login-input" placeholder="password"></input>
// </div>
