import { countdown } from "../../../../../lib/uc-lib";
import shared from "./shared";


export default () => {

    const { ID } = shared;

    const today = new Date();
    const tempDate = new Date();
  

    tempDate.setMonth(1);
    tempDate.setHours(23,59,59);
    tempDate.setDate(14);

    if(today - tempDate > 0) {
        // hide the countdown
        document.querySelector(`.product-summary .${ID}-offer`).style.display = 'none';
        return;
    }


  countdown({
    element: `.${ID}-countdown`,
    cutoff: tempDate,
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    hoursInsteadOfDays: true,
    labels: {
      d: 'days',
      h: 'hrs',
      m: 'min',
      s: 'sec',
    },
  });
}