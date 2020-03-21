export const convertCurrentToTimezone = (
  hourOffset: number,
  minuteOffSet: number
) => {
  const currentDate = new Date();
  const localTime = currentDate.getTime();
  const localOffset = currentDate.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const hourOffSetSeconds = 3600000 * hourOffset;
  const minuteOffSetSeconds = minuteOffSet * 60000;
  return utc + hourOffSetSeconds + minuteOffSetSeconds;
};

export const getReadableTime = (time: Date) => {
  function pad(input: number) {
    const inputString = input.toString();
    if (inputString.length > 1) {
      return inputString;
    } else if (inputString.length) {
      return `0${inputString}`;
    }
    return "00";
  }

  const hours = pad(time.getHours());
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};
