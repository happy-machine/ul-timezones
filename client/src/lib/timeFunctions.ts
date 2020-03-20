export const convertCurrentToTimezone = (utcOffset: number) => {
  const currentDate = new Date();
  const localTime = currentDate.getTime();
  const localOffset = currentDate.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  return utc + 3600000 * utcOffset;
};
