import React, { useState, useEffect } from "react";
import { convertCurrentToTimezone } from "../lib/timeFunctions";
import useWindowDimensions from "../components/useWindowDimensions";
import Clock from "react-clock";

type ITZClockProps = {
  utcOffset: number;
  className: string;
};

function TZClock({ utcOffset, className }: ITZClockProps) {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const { height, width } = useWindowDimensions();

  // Theres a better way to do this, but not in the time i have
  const size = Math.round((height * width) / 25000) + 40;

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date(convertCurrentToTimezone(utcOffset)));
    }, 1000);
  });
  return (
    <div
      title={`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} ${timezone}`}
    >
      <Clock
        className={className}
        renderMinuteMarks={false}
        renderHourMarks={false}
        value={time}
        size={size}
      />
    </div>
  );
}

export default TZClock;
