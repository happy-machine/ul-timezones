import React, { useState, useCallback } from "react";
import { searchTimezones } from "../lib/requests";
import TZClock from "./TZClock";
import ScaleLoader from "react-spinners/ClipLoader";

type ITimezoneProps = {
  hourOffset: number;
  minuteOffset: number;
  timezone: string;
};

type IResultProps = {
  id: number;
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
  old_id: number;
};

type ISearchProps = {
  searchString: string;
  setSearchString: (searchString: string) => void;
  setStatus: (status: string) => void;
  setTimezone: (timezone: ITimezoneProps) => void;
};

function Search({
  searchString,
  setSearchString,
  setStatus,
  setTimezone
}: ISearchProps) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const makeList = useCallback(() => {
    const handleSelectTimezone = (result: IResultProps) => {
      const { hours, minutes, name } = result;
      setTimezone({
        hourOffset: hours,
        minuteOffset: minutes,
        timezone: name.split(" UTC")[0]
      });
      setResults([]);
      setSearchString("");
      setStatus("Master time updated.");
    };

    return results.map((result: IResultProps) => {
      const { name, hours, minutes } = result;
      return (
        <div
          className="search-result"
          onClick={() => handleSelectTimezone(result)}
          key={result.id}
        >
          <div className="search-result-name">{name}</div>
          <div className="clock-container">
            <TZClock
              className="search-result-clock"
              hourOffset={hours}
              minuteOffset={minutes}
              size={40}
            />
          </div>
        </div>
      );
    });
  }, [results, setTimezone, setSearchString, setStatus]);

  const handleInput = useCallback(
    async e => {
      setSearchString(e.target.value);
      try {
        setLoading(true);
        const response = await searchTimezones(searchString);
        setLoading(false);
        setResults(response);
      } catch (e) {
        setStatus("Error searching.");
      }
    },
    [searchString, setSearchString, setStatus, setLoading]
  );

  return (
    <div id="search-container">
      <div id="search-spinner">
        <ScaleLoader size={150} color={"white"} loading={loading} />
      </div>
      <input
        value={searchString}
        id="search-input"
        placeholder="Search for a timezone..."
        onChange={handleInput}
        onPointerOver={() => setStatus("")}
      />
      {results && <ul id="results-list">{searchString && makeList()}</ul>}
    </div>
  );
}

export default Search;
