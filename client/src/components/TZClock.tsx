import React, { useState, useEffect } from "react";
import {
  convertCurrentToTimezone,
  getReadableTime
} from "../lib/timeFunctions";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import Clock from "react-clock";

type ITZClockProps = {
  hourOffset: number;
  minuteOffset: number;
  timezone?: string;
  size?: number;
  className?: string;
};

function TZClock({
  hourOffset,
  minuteOffset,
  timezone,
  className,
  size = 0
}: ITZClockProps) {
  const [time, setTime] = useState(new Date());
  const { height, width } = useWindowDimensions();

  // Theres a better way to do this, but not in the time i have
  const calcSize = Math.round((height * width) / 25000) + 40;

  useEffect(() => {
    setTimeout(() => {
      setTime(
        new Date(convertCurrentToTimezone(hourOffset || 0, minuteOffset || 0))
      );
    }, 1000);
  }, [hourOffset, minuteOffset]);

  return (
    <div title={timezone && `${getReadableTime(time)} ${timezone}`}>
      <Clock
        className={className}
        renderMinuteMarks={false}
        renderHourMarks={false}
        value={time}
        size={size || calcSize}
      />
    </div>
  );
}

export default TZClock;
