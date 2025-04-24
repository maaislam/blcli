import { countdown } from "../../../../../../lib/uc-lib";
import shared from "../shared";

export default () => {

  const { ID } = shared;

  const actualDate = document.getElementById('js-update-delivery');

  if(actualDate) {
    const countdownEl = document.createElement('p');
    countdownEl.classList.add(`${ID}__countdownText`);
    countdownEl.innerHTML = `Free tracked delivery on <span class="${ID}__deliveryDay">${actualDate.innerText.replace(/(,)(\s).+/, '').trim()}</span> when you order in <span class="${ID}__countdown"></span>`;

    if(document.querySelector(`.product-buy-now`)) {
      document.querySelector(`.product-buy-now`).insertAdjacentElement('afterend', countdownEl);
    } else {
      document.querySelector('.detail-page__right-column').appendChild(countdownEl);
    }

    const today = new Date();
    const tempDate = new Date();
    let cutoffDate = tempDate.setHours(15,0,0,0);

      // MONDAY 
      // before 3
      if(today.getDay() === 1 && today.getHours() >= 15) {
          cutoffDate = cutoffDate + (1 * 86400000); // add one day
      } 
    
      // TUESDAY
      if(today.getDay() === 2 && today.getHours() >= 15) {
          cutoffDate = cutoffDate + (1 * 86400000); // add one day
      } 
    
    
      //WEDNESDAY
      // if wednesday before 3, set delivery to tuesday
      if(today.getDay() === 3 && today.getHours() >= 15) {
        cutoffDate = cutoffDate + (1 * 86400000);
      } 
    
      // THURSDAY
      // if day is thursday after 19:00 set the delivery to monday
      if(today.getDay() === 4 && today.getHours() >= 15) {
        cutoffDate = cutoffDate + (3 * 86400000);
      }
    
     // If friday before 3pm, make it saturday
      if (today.getDay() === 5 && today.getHours() >= 15) {
        cutoffDate = cutoffDate + (2 * 86400000);
      }

      // Saturday, make the delivery on monday
      if(today.getDay() === 6) {
        cutoffDate = cutoffDate + (1 * 86400000);
      }
    
      // if sunday before 3pm
      if(today.getDay() === 0 && today.getHours() < 15) {
        cutoffDate = cutoffDate;
      }
      // if sunday after 3pm
      else if(today.getDay() === 0 && today.getHours() >= 15) {
        cutoffDate = cutoffDate + (1 * 86400000);
      }

      countdown({
          element: `.${ID}__countdown`,
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
}