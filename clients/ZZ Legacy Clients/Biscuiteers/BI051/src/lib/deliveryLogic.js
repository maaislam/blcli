import shared from './shared';

/**
 * Add days to date
 */
export const addDaysToDate = (startDate, daysToAdd) => {
  const date = new Date(startDate.getTime());
  date.setDate(date.getDate() + daysToAdd);
  return date;
};

/**
 * Calculate time from today to given Date-compatible string
 */
export const calculateTimeFromToday = (dateString) => {
  const chosenDate = new Date(dateString);
  const today = new Date();

  const dateDiff = (chosenDate - today) / 86400000;

  return Math.max(0, Math.ceil(dateDiff));
};

/**
 * Should show countdown, depends on cutoff
 */
export const isNextDayDeliveryPossibleNow = () => {
  const now = new Date();
  const curDow = parseInt(now.getDay(), 10);

  return shared.validDeliveryDays.indexOf(curDow) > -1 && now < shared.cutoffDate;
};
