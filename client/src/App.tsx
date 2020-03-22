import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import { cookieExists } from "./lib/cookie";
import { logout } from "./lib/auth";
import TZClock from "./components/TZClock";
import Login from "./components/Login";
import Search from "./components/Search";
import "./css/App.scss";
import "./css/components.scss";

function App() {
  const handleLogout = useCallback(async () => {
    logout();
    setLoggedIn(false);
  }, []);

  const [LoggedIn, setLoggedIn] = useState(cookieExists());
  const [status, setStatus] = useState("");
  const [timezone, setTimezone] = useState({
    hourOffset: 0,
    minuteOffset: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
  const [searchString, setSearchString] = useState("");

  return (
    <div className="App">
      {!LoggedIn && <div id="logged-out" />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="clock-logout-container">
          <div id="logout" onClick={handleLogout}>
            Logout
          </div>
          <TZClock
            className="header-clock"
            hourOffset={timezone.hourOffset}
            minuteOffset={timezone.minuteOffset}
            timezone={timezone.timezone}
          />
        </div>
      </header>

      <div id="status">{status}</div>
      <div id="container">
        <Search
          setStatus={setStatus}
          searchString={searchString}
          setSearchString={setSearchString}
          setTimezone={setTimezone}
        />
        {!LoggedIn && <Login setLoggedIn={setLoggedIn} setStatus={setStatus} />}
      </div>
    </div>
  );
}

export default App;
