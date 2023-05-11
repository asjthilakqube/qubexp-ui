import momentTimezone from "moment-timezone";

export default (arg) => {
  const defaultTimezone = momentTimezone.tz.guess();
  return momentTimezone(arg).tz(window.timeZone || defaultTimezone);
};
