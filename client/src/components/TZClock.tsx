import React, { useState, useEffect } from "react";
import {
  convertCurrentToTimezone,
  getReadableTime
} from "../lib/timeFunctions";
import Clock from "react-clock";

type ITZClockProps = {
  hourOffset: number;
  minuteOffset: number;
  timezone?: string;
  size?: number;
  className?: string;
};

function TZClock({
  hourOffset = 0,
  minuteOffset = 0,
  timezone,
  className,
  size = 80
}: ITZClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date(convertCurrentToTimezone(hourOffset, minuteOffset)));
    }, 1000);
    return () => clearInterval(id);
  }, [hourOffset, minuteOffset]);

  return (
    <div title={timezone && `${getReadableTime(time)} ${timezone}`}>
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
