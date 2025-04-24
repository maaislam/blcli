import { countdown } from "../../../../../lib/uc-lib";
import shared from "./shared";

export default () => {

  const { ID } = shared;

  const today = new Date();
  const tempDate = new Date();
  let cutoffDate = tempDate.setHours(15,0,0,0);

  if([1,2,3,4].indexOf(today.getDay()) > -1 && today.getHours() >= 15) {
    // Mon to Thurs, after 3pm
    cutoffDate = cutoffDate + (1 * 86400000);
  } else if (today.getDay() === 5 && today.getHours() >= 15) {
    // Fridy after 3pm
    cutoffDate = cutoffDate + (3 * 86400000);
  } else if (today.getDay() === 6) {
    // Saturday
    cutoffDate = cutoffDate + (2 * 86400000);
  } else if (today.getDay() === 0) {
    // Sunday
    cutoffDate = cutoffDate + (1 * 86400000);
  }

  countdown({
    element: `.${ID}-countdown`,
    cutoff: cutoffDate,
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    zeroPrefixSeconds: true,
    labelsMarkup: true,
    hoursInsteadOfDays: true,
    labels: {
      d: 'days',
      h: 'hours',
      m: 'mins',
      s: 'secs',
    },
  });
}
