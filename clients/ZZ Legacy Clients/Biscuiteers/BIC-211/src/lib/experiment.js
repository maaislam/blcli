/**
 * BIC-211 - PDP Personalisation Options - mobile only
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const makeAmends = () => {

  addPoller(['local-countdown', 'div[ng-bind="::\'check delivery info again\'|ms"]'], () => {

    // set Timeout to wait for countdown timer to be available (or not)

    setTimeout(() => {

      let countdown = document.querySelector('local-countdown');

      if(document.querySelector('div[click-event="delivery-details.modal.open.request"] > div').getAttribute('ng-switch-when')) {
        let todayDate = new Date();
        const enGBFormatter = new Intl.DateTimeFormat('en-GB');
        let deliveryDate = new Date(Number(todayDate))
        let tomorrowDate = deliveryDate.setDate(todayDate.getDate() + 1)
        let twoDaysAfterDate = deliveryDate.setDate(todayDate.getDate() + 2)

        const targetDate = new Date();
        targetDate.setHours(13);
        targetDate.setMinutes(0);

        const startCountdownDate = new Date();
        startCountdownDate.setHours(12);
        startCountdownDate.setMinutes(0);
        
        let headingInsertHTML = `
          <img src="https://cdn-sitegainer.com/dhe1vg65jts0bs1.png" alt="delivery truck icon" class="${ID}-truck-icon" />
          <p id="${ID}-countdown-timer-holder" class="${ID}-countdown-timer-holder"> Loading... </p>
        `;
    
        let headingInsertInsertionPoint = document.querySelector('local-countdown');
        headingInsertInsertionPoint.insertAdjacentHTML('beforebegin', headingInsertHTML);
    
        let countdownTimerHolder = document.getElementById(`${ID}-countdown-timer-holder`);


        let hOne = document.querySelector('h1').innerText;

        if(hOne.indexOf('macaron') <= -1 && hOne.indexOf('chocolates') <= -1 && hOne.indexOf('hampers') <= -1 && hOne.indexOf('cheese') <= -1 && hOne.indexOf('birthday cake') <= -1) {
          let linkInsertHTML = `
            <p class="${ID}-intl-delivtext">International delivery available at checkout</p>
          `;
          let linkInsertInsertionPoint = document.querySelector('div[ng-bind="::\'check delivery info again\'|ms"]');
          linkInsertInsertionPoint.insertAdjacentHTML('beforebegin', linkInsertHTML);
        } 

        let checkInfoButton = document.querySelector('div[ng-bind="::\'check delivery info again\'|ms');
        checkInfoButton.innerHTML = "check delivery info";

        if(countdown.childElementCount == 0 && (todayDate > targetDate)) {

          countdownTimerHolder.innerHTML = `Available for delivery on ${enGBFormatter.format(twoDaysAfterDate)}`;

        } else {

          if(todayDate > startCountdownDate && todayDate < targetDate) {

            countdownTimerHolder.innerHTML = `Checkout in <span id="${ID}-countdown-timer"></span> for delivery on ${enGBFormatter.format(tomorrowDate)}`;

            let cdTimerSpan = document.getElementById(`${ID}-countdown-timer`);

            let interval = setInterval(() => {
              let countdownTime = countdown.querySelector('.countdown-time').innerHTML;
              countdownTime = countdownTime.substring(countdownTime.indexOf(':') + 1, countdownTime.length);
              countdownTime = countdownTime.replace(':', 'm ');
              countdownTime = countdownTime + "s";
              cdTimerSpan.innerHTML = countdownTime;
              if(countdownTime == "0:01") {
                clearInterval(interval);
                deliveryDate = deliveryDate.setDate(todayDate.getDate() + 2)
                countdownTimerHolder.innerHTML = `Available for delivery on ${enGBFormatter.format(twoDaysAfterDate)}`;
              }
            }, 500);

          } else {

            countdownTimerHolder.innerHTML = `Checkout before 1pm for delivery on ${enGBFormatter.format(tomorrowDate)}`;

            let cdTimerSpan = document.getElementById(`${ID}-countdown-timer`);

            let interval = setInterval(() => {
              let currDate = new Date();
              if(currDate >= startCountdownDate) {
                let countdownTime = countdown.querySelector('.countdown-time').innerHTML;
                countdownTime = countdownTime.substring(countdownTime.indexOf(':') + 1, countdownTime.length);
                countdownTime = countdownTime.replace(':', 'm ');
                countdownTime = countdownTime + "s";
                countdownTimerHolder.innerHTML = `Checkout in <span id="${ID}-countdown-timer"></span> for delivery on ${enGBFormatter.format(tomorrowDate)}`;
                document.getElementById(`${ID}-countdown-timer`).innerHTML = countdownTime; 
                
                if(countdownTime == "0:01") {
                  clearInterval(interval);
                  deliveryDate = deliveryDate.setDate(todayDate.getDate() + 2)
                  countdownTimerHolder.innerHTML = `Available for delivery on ${enGBFormatter.format(twoDaysAfterDate)}`;
                }
                
              } 

              
            }, 500);


          }

          

        }

        let visibleMessage = "Visible - experiment shown";
        logMessage(visibleMessage);
        fireEvent(visibleMessage);
      } 

    }, 1000);

  });


}

const addTracking = () => {

  addPoller(['div[ng-bind="::\'check delivery info again\'|ms"]'], () => {
    let linkAfterCountdown = document.querySelector('div[ng-bind="::\'check delivery info again\'|ms"]');
    linkAfterCountdown.addEventListener('click', (e) => {

      let eventMessage = "Click - check delivery info button";
      logMessage(eventMessage);
      fireEvent(eventMessage);

    });
  });

  addPoller(['local-add-to-basket action'], () => {
    let actionButton = document.querySelector('local-add-to-basket action');
    actionButton.addEventListener('click', (e) => {

      let eventMessage = "Click - ATB button";
      logMessage(eventMessage);
      fireEvent(eventMessage);

    });
  });

  

}


export default () => {

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  addTracking();

  if(VARIATION == "control") {
    return;
  }
  
  makeAmends();

  let currHref = window.location.href;

  const wrap = document.body;
  addObserver(wrap, () => {
    logMessage(`${ID} observer event triggered`);
    if (currHref !== window.location.href && document.querySelector('local-product-custom-options')) {
      checkProductType();
    }
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  })

  // --------------------------
  // Workaround for orientation change
  // --------------------------
  addEventListener(window, 'orientationchange', () => {
    window.location.reload();
  });


};
