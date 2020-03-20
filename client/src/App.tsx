import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import TZClock from "./components/TZClock";
import Login from "./components/Login";
import ScaleLoader from "react-spinners/ClipLoader";
import "./css/App.scss";
import "./css/components.scss";

function App() {
  const [LoggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      {!LoggedIn && <div id="logged-out" />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id="logout">Logout</div>
        <TZClock className="header-clock" utcOffset={5} />
      </header>
      <input id="search-input" placeholder="Search for a timezone..." />
      <ScaleLoader size={150} color={"white"} loading={loading} />
      {!LoggedIn && <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
