/**
 * SD-309 - Branded Search
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
let insertedHTML;
let togoBarHolder, elapsedBarHolder; 

const initCountdown = () => {
  // set up the countdown timer
  countdown({
    cutoff: targetDate,
    element: '#SD-309-countdown-item',
    labels: {
      d: 'days',
      h: ':',
      m: ':',
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

const createAndInsertCountdown = () => {
  
  // create and insert the two types of timer, based on the variation
  if(VARIATION == 1) {
    insertedHTML = `
      
        <div class="${ID}-basket-countdown"> 

          <div class="${ID}-ndd-info-holder">
            <h2> NEXT DAY DELIVERY </h2>
            <p> Get it tomorrow, if ordered by 8pm today </p>
            
          </div>

          <div class="${ID}-ndd-countdown-holder">

            <svg width="38" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.03 29.48"><defs><style>.cls-1{fill:#fff;}</style></defs><g id="DELIVERY-ICON"><g id="Path_350" data-name="Path 350"><path d="M117.28,66.23H81.92v-23h35.36v23Z" transform="translate(-64.82 -42.24)"/><path d="M117.28,67.27H80.88v-25h37.44v25ZM83,65.19h33.29V44.32H83Z" transform="translate(-64.82 -42.24)"/></g><g id="Path_351" data-name="Path 351"><path d="M132.85,67.27H116.24v-18h10.39L132.85,56Zm-14.53-2.08h12.45V56.8l-5-5.46h-7.41Z" transform="translate(-64.82 -42.24)"/></g><g id="Ellipse_12" data-name="Ellipse 12"><circle class="cls-1" cx="22.72" cy="24.92" r="3.51"/><path d="M87.53,71.72a4.56,4.56,0,1,1,4.55-4.55A4.57,4.57,0,0,1,87.53,71.72Zm0-7A2.48,2.48,0,1,0,90,67.17,2.48,2.48,0,0,0,87.53,64.69Z" transform="translate(-64.82 -42.24)"/></g><g id="Path_969" data-name="Path 969"><path class="cls-1" d="M126.18,63.65a3.52,3.52,0,1,1-3.51,3.51,3.51,3.51,0,0,1,3.51-3.51Z" transform="translate(-64.82 -42.24)"/><path d="M126.18,71.72a4.56,4.56,0,1,1,4.55-4.55A4.56,4.56,0,0,1,126.18,71.72Zm0-7a2.48,2.48,0,1,0,2.47,2.48A2.48,2.48,0,0,0,126.18,64.69Z" transform="translate(-64.82 -42.24)"/></g><g id="Line_336" data-name="Line 336"><rect class="cls-1" x="17.1" y="18.03" width="35.13" height="2.08"/></g><g id="Line_337" data-name="Line 337"><rect x="6.56" y="3.98" width="7.96" height="2.08"/></g><g id="Line_338" data-name="Line 338"><rect x="3.28" y="9.6" width="11.24" height="2.08"/></g><g id="Line_339" data-name="Line 339"><rect y="15.22" width="14.52" height="2.08"/></g></g></svg>

            <span class="${ID}-countdown-item" id="${ID}-countdown-item"></span> 

          </div>
        </div>
      
    `;

    if(window.location.href.indexOf('cart') > -1) {

      if(window.outerWidth < 767) {
        pollerLite(['#BasketHeaderText'], () => {
          document.getElementById('BasketHeaderText').insertAdjacentHTML('beforebegin',  `<div class="${ID}-basket-countdown-outer cart">${insertedHTML}</div>`);
        });
      } else if(window.outerWidth > 767 && window.outerWidth < 1020) {
        pollerLite(['#divContinueSecurely'], () => {
          document.getElementById('divContinueSecurely').insertAdjacentHTML('afterbegin',  `<div class="${ID}-basket-countdown-outer cart">${insertedHTML}</div>`);
        });


      } else {
        pollerLite(['.newBasketSummary'], () => {
          document.querySelector('.newBasketSummary h2').insertAdjacentHTML('afterend', `<div class="${ID}-basket-countdown-outer cart">${insertedHTML}</div>`);
        });
      }

      
    } 
    pollerLite(['.summaryWrapCTA'], () => {
      document.querySelector('.summaryWrapCTA').insertAdjacentHTML('beforebegin',  `<div class="${ID}-basket-countdown-outer mini-bag">${insertedHTML}</div>`);
    });
    
    
  } 

  togoBarHolder = document.getElementById('SD-309-togo');
  elapsedBarHolder = document.getElementById('SD-309-elapsed');
  initCountdown();
}

const activate = () => {
 
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

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
    if(currDay !== 6 && (currDate < targetDate) && errorsShown !== true && basketQuantity > 0) {
      createAndInsertCountdown();
      let placement = "mini-bag";
      if(window.location.href.indexOf('cart') > -1) {
        placement = "mini-bag & cart";
      }

      let variantMessageYes = 'Conditions Met - Countdown timer displayed - placement: '+placement;
      logMessage(variantMessageYes);
      fireEvent(variantMessageYes);
    } else {
      let variantMessageNo = 'Conditions Met - Test stopped. saturday detected, or time between 8 & 12, or no items in basket, or errors shown';
      logMessage(variantMessageNo);
      fireEvent(variantMessageNo);
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
          let placement = "mini-bag";
          if(window.location.href.indexOf('cart') > -1) {
            placement = "mini-bag & cart";
          }


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
