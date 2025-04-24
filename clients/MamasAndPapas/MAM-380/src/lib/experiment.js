/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { observer, pollerLite, countdown } from './../../../../../lib/uc-lib';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const targetDate = new Date();
targetDate.setDate(5);
targetDate.setMonth(11);
targetDate.setHours(23);
targetDate.setMinutes(59, 0, 0);
let insertedHTML;

const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.cart) {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}

const initCountdown = () => {

  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: `#${ID}-bf-countdown--timer`,
    labels: {
      d: 'days',
      h: 'hours',
      m: 'mins',
      s: '',
    },
    zeroPrefixHours: true,
    zeroPrefixMinutes: true,
    zeroPrefixSeconds: true,
    hoursInsteadOfDays: false,
    delivery: {
      deliveryDays: null,
      excludeDays: null,
      deliveryDayElement: null,
      tomorrowLabel: false,
      showFullDate: false,
      dayLabelStyle: 'long',
      monthLabelStyle: 'long',
    },
  });

}



const startExperiment = () => {

  let cdHTML = `
  
    <div class="${ID}-bf-countdown">
    
      <a href="/collections/black-friday" id="${ID}-bf-countdown--link"> <span class="${ID}-bold">Hurry! Our Black Friday event</span> ends in <span class="${ID}-bf-countdown--timer" id="${ID}-bf-countdown--timer"></span> </a>    
    
    </div>
  
  `;

  if(getPageData().page.template == "index") {

    let insertionPoint = document.body;
    insertionPoint.insertAdjacentHTML('beforeend', cdHTML);
    document.querySelector(`.${ID}-bf-countdown`).classList.add('homepage')

    fireEvent('Visible - banner added to the homepage');

  } else {
    
    let insertionPoint = document.querySelector('.site-header__wrapper');
    insertionPoint.insertAdjacentHTML('afterend', cdHTML);

    fireEvent('Visible - banner added to PLP/PDP');
  }

  initCountdown();

  let link = document.getElementById(`${ID}-bf-countdown--link`);

  link.addEventListener('click', () => {
    fireEvent('Click - user has clicked on the banner to go to the black friday sale event');
  })


}

export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  pollerLite([
    () => { return getPageData(); }
  ], () => {
    startExperiment();
  })

  
  
};
