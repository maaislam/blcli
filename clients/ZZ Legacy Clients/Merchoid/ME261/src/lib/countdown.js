import { countdown } from "../../../../../lib/uc-lib";
import shared from "./shared";

export default () => {

  const { ID } = shared;

  const today = new Date();
  const tempDate = new Date();
  let cutoffDate = tempDate.setHours(13,0,0,0);


    // make red if less than 2
    if(today.getHours() < 13 && today.getHours() >= 11) {
        document.querySelector(`.${ID}-countdown`).classList.add(`${ID}-lessThan2`);
    }

    // if saturday
    if(today.getDay() === 6) {
      cutoffDate = cutoffDate + (1 * 86400000);
    }

  countdown({
    element: '.ME261-countdown',
    cutoff: cutoffDate,
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    labels: {
      d: 'days',
      h: 'hrs',
      m: 'min',
      s: 'sec',
    },
  });
}