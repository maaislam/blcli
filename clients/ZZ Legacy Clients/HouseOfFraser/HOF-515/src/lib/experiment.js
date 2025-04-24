/**
 * HOF-515 - Branded Search
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
import { events, logMessage } from './../../../../../lib/utils';
import { observer, pollerLite, countdown } from './../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const currDate = new Date();
const targetDate = new Date();
targetDate.setHours(20);
targetDate.setMinutes(0, 0, 0);
const startShowingDate = new Date();
startShowingDate.setHours(14);
startShowingDate.setMinutes(0, 0, 0);
let insertedHTML;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: '#HOF-515-countdown-item',
    labels: {
      d: 'days',
      h: 'h',
      m: 'm',
      s: 's',
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

const createAndInsertCountdown = () => {
  
  // create and insert the two types of timer, based on the variation

  insertedHTML = `
      
      <div class="${ID}-basket-countdown"> 

        <p> Checkout in <span class="${ID}-countdown-item" id="${ID}-countdown-item"></span> for <span class="${ID}-ndd-span">Express Delivery</span> </p>

        <p class="${ID}-smalltext">*Excludes pre-order items</p>
      </div>
    
  `;

  if(VARIATION == 1) {
    pollerLite(['.summaryWrapCTA'], () => {
      document.querySelector('.summaryWrapCTA').insertAdjacentHTML('afterend',  `<div class="${ID}-basket-countdown-outer mini-bag">${insertedHTML}</div>`);
    });
  } else if(VARIATION == 2) {
    if(window.location.href.indexOf('cart') > -1) {
      pollerLite(['#divContinueSecurely'], () => {
        document.querySelector('#divContinueSecurely').insertAdjacentHTML('beforeend', `<div class="${ID}-basket-countdown-outer cart">${insertedHTML}</div>`);
      });
    }
  }

  initCountdown();
}

const addAllEventTracking = () => {

  if(VARIATION == 1 || VARIATION == "control") {
    let divBag = document.getElementById('divBag');
    divBag.addEventListener('mouseenter', (e) => {
      fireAndLogEvent('Interaction - user hovered over the mini-bag opening it');
    })
  } else if(VARIATION == 2 || VARIATION == "control") {
    if(window.location.href.indexOf('cart') > -1) {
      fireAndLogEvent('Interaction - user has viewed the cart page');
    }
  }

}

const activate = () => {
 
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // control / variation event tracking

  addAllEventTracking();


  if(VARIATION != "control") {
    // logic for showing the test
    // if there are any errors on the basket (out of stock etc) don't
    // show the test
    let errorsShown = false;
    let errorMessages = document.querySelectorAll('#rptErrorMessages .error li');
    if(typeof errorMessages === null || errorMessages.length > 0) {
      errorsShown = true;
    }
    // check if there are items in the basket
    let basketQuantity = document.getElementById('bagQuantity').innerHTML;
    basketQuantity = parseInt(basketQuantity);
    
    // if the day is a saturday, or the time is between 7pm and 12am, or there are errors shown
    // on the basket, don't show the timer and fire an event. If these don't apply, fire it.
    let currDay = currDate.getDay();
    if(currDay !== 6 && (currDate < targetDate && currDate > startShowingDate) && errorsShown !== true && basketQuantity > 0) {
      createAndInsertCountdown();
      let placement = "mini-bag";
      if(VARIATION == 2) {
        placement = "cart";
      }

      fireAndLogEvent('Conditions Met - Countdown timer displayed - placement: '+placement);
    } else {
      fireAndLogEvent('Conditions Met - Test stopped. saturday detected, or time between not between 5-8pm, or no items in basket, or errors shown');
    }

    // Trigger re render on pagniation change
    const wrap = document.getElementById('bagQuantity');
    observer.connect(wrap, () => {

        if(parseInt(wrap.innerHTML) > 0) {

          let currentCountdownTimers = document.querySelectorAll(`.${ID}-basket-countdown`);
          [].slice.call(currentCountdownTimers).forEach((timer) => {
            timer.remove();
          });

          createAndInsertCountdown();

        } else {
          let currentCountdownTimers = document.querySelectorAll(`.${ID}-basket-countdown`);
          [].slice.call(currentCountdownTimers).forEach((timer) => {
            timer.remove();
          });
        }
        

        

    }, {
        config: {
            attributes: true,
            childList: true,
            subtree: false,
        }
    })


  } 
  

}

export default activate;
