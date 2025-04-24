/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite, logMessage, setCookie, getCookie, deleteCookie } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;
let timeInterval;

const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

const initializeClock = (id, endtime) => {
  const clock = document.getElementById(id);
  //const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector(`.${ID}-hours-holder`);
  const minutesSpan = clock.querySelector(`.${ID}-mins-holder`);
  const secondsSpan = clock.querySelector(`.${ID}-secs-holder`);

  function updateClock() {
    const t = getTimeRemaining(endtime);

    hoursSpan.querySelector('.digit1').innerText = ('0' + t.hours).slice(-2)[0];
    hoursSpan.querySelector('.digit2').innerText = ('0' + t.hours).slice(-2)[1];

    minutesSpan.querySelector('.digit1').innerText = ('0' + t.minutes).slice(-2)[0];
    minutesSpan.querySelector('.digit2').innerText = ('0' + t.minutes).slice(-2)[1];

    secondsSpan.querySelector('.digit1').innerText = ('0' + t.seconds).slice(-2)[0];
    secondsSpan.querySelector('.digit2').innerText = ('0' + t.seconds).slice(-2)[1];

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  timeInterval = setInterval(updateClock, 1000);
}

const callAndApplyOffer = (offerType) => {
  //write a fetch function to query an API
  let offerUniqodoCode = ``;
  if (offerType == 'saveten') {
    offerUniqodoCode = `25926`;
  } else if (offerType == 'savefifteen') {
    offerUniqodoCode = `25927`;
  }

  fetch(`https://api.uniqodo.com/code/396ef7df2b40d3a7a0b9b8645a8d994d67a7dfb2/${offerUniqodoCode}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(returnedData => {

      logMessage('API Response: ', returnedData);
      let offerCode = returnedData.data.code;

      let offerDetails = {
        "offerCode": offerCode,
        "offerTimeStart": new Date().getTime(),
        "offerType": offerType,
      };

      setCookie('_uqd_param', offerCode);
      setCookie(`${ID}-${offerType}-details`, JSON.stringify(offerDetails));
      clearInterval(timeInterval);
      initializeClock(`${ID}-clockdiv`, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      let currCode = document.querySelector('.oct-offer-code .oct-input').value;
      document.getElementById(`${ID}-clockdiv`).classList.add(`${ID}-active`);
      document.querySelector('.oct-offer-code .oct-input').value = "";
      document.querySelector('.oct-offer-code .oct-input').value = offerCode;
      if (offerType == 'savefifteen') {
        document.querySelector(`.${ID}-offerelement--offerone`).classList.add(`${ID}-hidden`);
      }
      let applyButton = document.querySelector('.oct-offer-code .oct-button');
      let currButtonAction = applyButton.getAttribute('aria-label');
      let unqFound = document.querySelector('.oct-basket-totals')?.innerText.indexOf('UNQ') > -1;

      if (unqFound == false) {
        applyButton.click();
      }

      if (currButtonAction == 'Remove Offer Code' && currCode !== offerCode) {
        applyButton.click();
        let interval = setInterval(() => {

          if (applyButton.getAttribute('aria-label') == "Apply Offer Code") {
            clearInterval(interval);
            setTimeout(() => {
              document.querySelector('.oct-offer-code .oct-input').value = "";
              document.querySelector('.oct-offer-code .oct-input').value = offerCode;
              applyButton.click();
            }, 1000);
          }

        }, 100);
      }


    })
    .catch((error) => {
      console.error(error);
    });

}

const processBasketData = () => {

  if (document.querySelector(`.oct-basket-totals__topDescription .oct-basket-totals__descriptionEnd`)) {

    let basketTotal = parseFloat(document.querySelector('.oct-basket-totals__topDescription .oct-basket-totals__descriptionEnd').innerText.replace('£', ''));
    let savings = 0.00;
    if (document.querySelector('.oct-basket-totals__topDescription .oct-basket-totals__red .oct-basket-totals__descriptionEnd')) {
      savings = parseFloat(document.querySelector('.oct-basket-totals__topDescription .oct-basket-totals__red .oct-basket-totals__descriptionEnd').innerText.replace('£', '').replace('-', ''));
    }

    basketTotal = basketTotal - savings;

    logMessage("basket total: " + basketTotal);

    let offerOneTarget = 40;
    let offerTwoTarget = 60;

    let offerOneLeft = offerOneTarget - basketTotal;
    let offerTwoLeft = offerTwoTarget - basketTotal;

    let offerOneFill = (basketTotal / offerOneTarget) * 100;
    let offerTwoFill = (basketTotal / offerTwoTarget) * 100;

    document.getElementById(`${ID}-offerone--left`).innerText = `£${offerOneLeft.toFixed(2)}`;
    document.getElementById(`${ID}-offertwo--left`).innerText = `£${offerTwoLeft.toFixed(2)}`;

    document.querySelector(`.${ID}-offerelement--offerone .${ID}-offerelement--offer--progressbar--fill`).style.width = `${offerOneFill}%`;
    document.querySelector(`.${ID}-offerelement--offertwo .${ID}-offerelement--offer--progressbar--fill`).style.width = `${offerTwoFill}%`;

    if (offerOneLeft <= 0) {
      document.querySelector(`.${ID}-offerelement--offerone`).classList.add(`${ID}-complete`);
      setCookie(`${ID}-current-offer`, 'saveten', 1);
      if (!getCookie(`${ID}-saveten-details`) && offerTwoLeft > 0) {
        callAndApplyOffer('saveten');
      } else if (getCookie(`${ID}-saveten-details`) && offerTwoLeft > 0) {
        setTimeout(() => {
          processTenPercentOffer();
        }, 500);

      }

    } else {
      if (document.querySelector(`.${ID}-offerelement--offerone`).classList.contains(`${ID}-complete`)) {
        document.querySelector(`.${ID}-offerelement--offerone`).classList.remove(`${ID}-complete`);
      }
    }

    if (offerTwoLeft <= 0) {
      document.querySelector(`.${ID}-offerelement--offertwo`).classList.add(`${ID}-complete`);
      document.querySelector(`.${ID}-offerelement--offerone`).classList.add(`${ID}-hidden`);
      setCookie(`${ID}-current-offer`, 'savefifteen', 1);
      if (!getCookie(`${ID}-savefifteen-details`)) {
        callAndApplyOffer('savefifteen');
      } else {
        setTimeout(() => {
          processFifteenPercentOffer();
        }, 500);
      }
    } else {

      document.querySelector(`.${ID}-offerelement--offerone`).classList.remove(`${ID}-hidden`);

      if (document.querySelector(`.${ID}-offerelement--offertwo`).classList.contains(`${ID}-complete`)) {
        document.querySelector(`.${ID}-offerelement--offertwo`).classList.remove(`${ID}-complete`);
      }
    }

    if (offerOneLeft > 0 && offerTwoLeft > 0) {
      document.querySelector(`.${ID}-offerelement--offerone`).classList.remove(`${ID}-hidden`);
      document.querySelector(`.${ID}-clockdiv`).classList.remove(`${ID}-active`);
    }

  } else {

    document.querySelector(`.${ID}-offerelement`).remove();

  }

}

const processTenPercentOffer = () => {

  let timeStart = JSON.parse(getCookie(`${ID}-saveten-details`)).offerTimeStart;
  let offerCode = JSON.parse(getCookie(`${ID}-saveten-details`)).offerCode;
  setCookie('_uqd_param', offerCode);
  let timeEnd = timeStart + 24 * 60 * 60 * 1000;
  let currCode = document.querySelector('.oct-offer-code .oct-input').value;
  clearInterval(timeInterval);
  initializeClock(`${ID}-clockdiv`, new Date(timeEnd));
  document.getElementById(`${ID}-clockdiv`).classList.add(`${ID}-active`);
  let applyButton = document.querySelector('.oct-offer-code .oct-button');
  document.querySelector('.oct-offer-code .oct-input').value = "";
  document.querySelector('.oct-offer-code .oct-input').value = offerCode;
  let currButtonAction = applyButton.getAttribute('aria-label');

  let unqFound = document.querySelector('.oct-basket-totals')?.innerText.indexOf('UNQ') > -1;

  if (unqFound == false) {
    applyButton.click();
  }

  if (currButtonAction == 'Remove Offer Code' && currCode !== offerCode) {
    applyButton.click();
    let interval = setInterval(() => {

      if (applyButton.getAttribute('aria-label') == "Apply Offer Code") {
        clearInterval(interval);
        setTimeout(() => {
          document.querySelector('.oct-offer-code .oct-input').value = "";
          document.querySelector('.oct-offer-code .oct-input').value = offerCode;
          applyButton.click();
        }, 1000);
      }

    }, 100);
  }

}

const processFifteenPercentOffer = () => {

  let timeStart = JSON.parse(getCookie(`${ID}-savefifteen-details`)).offerTimeStart;
  let offerCode = JSON.parse(getCookie(`${ID}-savefifteen-details`)).offerCode;
  let timeEnd = timeStart + 24 * 60 * 60 * 1000;
  let currCode = document.querySelector('.oct-offer-code .oct-input').value;
  setCookie('_uqd_param', offerCode);
  clearInterval(timeInterval);
  initializeClock(`${ID}-clockdiv`, new Date(timeEnd));
  document.getElementById(`${ID}-clockdiv`).classList.add(`${ID}-active`);
  let applyButton = document.querySelector('.oct-offer-code .oct-button');
  document.querySelector('.oct-offer-code .oct-input').value = "";
  document.querySelector('.oct-offer-code .oct-input').value = offerCode;
  let currButtonAction = applyButton.getAttribute('aria-label');

  let unqFound = document.querySelector('.oct-basket-totals')?.innerText.indexOf('UNQ') > -1;

  if (unqFound == false) {
    applyButton.click();
  }

  if (currButtonAction == 'Remove Offer Code' && currCode !== offerCode) {
    applyButton.click();
    let interval = setInterval(() => {

      if (applyButton.getAttribute('aria-label') == "Apply Offer Code") {
        clearInterval(interval);
        setTimeout(() => {
          document.querySelector('.oct-offer-code .oct-input').value = "";
          document.querySelector('.oct-offer-code .oct-input').value = offerCode;
          applyButton.click();
        }, 1000);
      }

    }, 100);


  }




}

const startBasketContent = () => {

  let basketCheckInterval = setInterval(() => {

    if (document.querySelector('.oct-basket__content') && document.querySelector('.oct-basket__scrollable-wrapper').childNodes.length > 1) {

      clearInterval(basketCheckInterval);
      let emptyBasket = false;

      let currBasketOuterHTML = document.querySelector('.oct-basket__content').outerHTML;
      if (currBasketOuterHTML.indexOf('Your basket is empty') > -1) {
        emptyBasket = true;
      }

      logMessage("Empty Basket: " + emptyBasket);
      if (!emptyBasket) {

        let newBasketElementHTML = `
        
          <div class="${ID}-offerelement oct-tile oct-tile--padding-m">
          
          
            <div class="${ID}-offerelement--header">
              <h2>Secret Offer</h2>
              <p> 24 hours only - <a target="_blank" href="https://www.boots.com/information/terms-conditions" id="${ID}-tsandcs">T&Cs apply</a></p>

              <div id="${ID}-clockdiv" class="${ID}-clockdiv">
                <div class="${ID}-hours">
                  <div class="smalltext">Hours</div>
                  <div class="${ID}-hours-holder">
                    <span class="digit1">2</span>
                    <span class="digit2">3</span>
                  </div>
                </div>
                <div class="${ID}-minutes">
                  <div class="smalltext">Minutes</div>
                  <div class="${ID}-mins-holder">
                    <span class="digit1">5</span>
                    <span class="digit2">9</span>
                  </div>
                </div>
                <div class="${ID}-seconds">
                  <div class="smalltext">Seconds</div>
                  <div class="${ID}-secs-holder">
                    <span class="digit1">5</span>
                    <span class="digit2">9</span>
                  </div>
                </div>
              </div>

            </div>

            <div class="${ID}-offerelement--offer ${ID}-offerelement--offerone">
              <div class="${ID}-offerelement--offer--text">
                <span class="${ID}-offerelement--offer--text--notcomplete">Spend <span id="${ID}-offerone--left">£0</span> more to save 10%</span>
                <span class="${ID}-offerelement--offer--text--complete">Great! You've saved 10% today</span>
              </div>
              <div class="${ID}-offerelement--offer--target">£40</div>
              <div class="${ID}-offerelement--offer--progressbar">
                <div class="${ID}-offerelement--offer--progressbar--fill" style="width: 0%"></div>
              </div>
              
            </div>

            <div class="${ID}-offerelement--offer ${ID}-offerelement--offertwo">
              <div class="${ID}-offerelement--offer--text">
                <span class="${ID}-offerelement--offer--text--notcomplete">Spend <span id="${ID}-offertwo--left">£0</span> more to save 15%</span>
                <span class="${ID}-offerelement--offer--text--complete">Great! You've saved 15% today</span>
              </div>
              <div class="${ID}-offerelement--offer--target">£60</div>
              <div class="${ID}-offerelement--offer--progressbar">
                <div class="${ID}-offerelement--offer--progressbar--fill" style="width: 0%"></div>
              </div>
            </div>
          
          </div>        
        
        `;
        pollerLite(['.oct-basket-messaging'], () => {
          if (!document.querySelector(`.${ID}-offerelement`)) {
            let insertionPoint = document.querySelector('.oct-basket-messaging');
            insertionPoint.insertAdjacentHTML('beforebegin', newBasketElementHTML);
          }


        })

        pollerLite(['.oct-basket-totals__row .oct-basket-totals__descriptionEnd', `#${ID}-offerone--left`, `#${ID}-offertwo--left`], () => {

          processBasketData();

          window.addEventListener("oct-basket:updated", () => {

            if (document.querySelector('.oct-basket-header')) {
              setTimeout(() => {
                processBasketData();
              }, 1000);

            }

          });

        })


      }


    }

  }, 10);


}

const startExperiment = () => {

  logMessage("EXP STARTED");

  // Add your experiment code here. The code will run when the experiment is live.
  // You can use the logMessage function to log output to the console

  // VARIABLE DECLARATIONS

  let currentTimestamp = new Date().getTime();
  let persObj = JSON.parse(localStorage.getItem('ATPersObj'));
  let sessionStamps = persObj.sessionStamps;
  let sessionStampsLength = sessionStamps.length;
  let insertionPoint = document.body;

  let offerOverlayHTML = `

    <div class="${ID}-overlay">

      <div class="${ID}-offer">

        <h2>Secret Offer</h2>
      
        <p> Save 10% when you spend £40 or save 15% when you spend £60</p>

        
        <p class="${ID}-secondary"> 24 hours only - <a target="_blank" href="https://www.boots.com/information/terms-conditions" id="${ID}-tsandcs">T&Cs apply</a></p>

        

      </div>

      <div class="${ID}-cta">
      
        <button id="${ID}-applybutton" class="${ID}-button">View Basket</button>
      
      </div>

      <button class="${ID}-close" id="${ID}-close"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16.5 16.5L0.5 0.5M16.5 0.5L0.5 16.5" stroke="#05054B" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      
    </div>

  `;

  // ADDING TO THE DOM
  if (getCookie(`${ID}-closed-homepage-modal`)) {
    if (parseInt(getCookie(`${ID}-closed-homepage-modal`)) < sessionStamps[sessionStampsLength - 1]) {
      insertionPoint.insertAdjacentHTML('beforeend', offerOverlayHTML);
      document.documentElement.classList.add(`${ID}-noscroll`);
    }

  } else {
    insertionPoint.insertAdjacentHTML('beforeend', offerOverlayHTML);
    document.documentElement.classList.add(`${ID}-noscroll`);
  }


  // EVENT LISTENERS
  document.body.addEventListener('click', (e) => {

    if ((e.target.id == `${ID}-applybutton`)) {
      fireEvent('Click - user has clicked on the view basket button to open the basket', true);
      document.querySelector(`.${ID}-overlay`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);
      setCookie(`${ID}-closed-homepage-modal`, currentTimestamp, 1);
      document.querySelector('.oct-iconButton').click();
      startBasketContent();


    }

    if (e.target.classList.contains(`${ID}-close`) || e.target.closest(`.${ID}-close`)) {
      document.querySelector(`.${ID}-overlay`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);
      setCookie(`${ID}-closed-homepage-modal`, currentTimestamp, 1);
      fireEvent(`Click - user clicked on the close X to dismiss the offer`, true);
    }

  });

  document.documentElement.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`.${ID}-overlay`)) {
      document.querySelector(`.${ID}-overlay`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);
      fireEvent(`Click - user clicked outwith the modal to dismiss the offer`, true);
    }

  });



}

export default () => {

  setup();

  if (window.usabilla_live) {
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  let dateNow = new Date().getTime();
  let saveTenOfferExpired = false;
  let saveFifteenOfferExpired = false;
  if (getCookie(`${ID}-saveten-details`)) {
    let saveTenOfferTimeStart = JSON.parse(getCookie(`${ID}-saveten-details`)).offerTimeStart;
    if (saveTenOfferTimeStart + 24 * 60 * 60 * 1000 < dateNow) {
      saveTenOfferExpired = true;
    }
  }

  if (getCookie(`${ID}-savefifteen-details`)) {
    let saveFifteenOfferTimeStart = JSON.parse(getCookie(`${ID}-savefifteen-details`)).offerTimeStart;
    if (saveFifteenOfferTimeStart + 24 * 60 * 60 * 1000 < dateNow) {
      saveFifteenOfferExpired = true;
    }
  }



  logMessage("Save Ten Offer Expired: " + saveTenOfferExpired);
  logMessage("Save Fifteen Offer Expired: " + saveFifteenOfferExpired);


  if (window.location.href.indexOf('bo329testing=true') > -1 || getCookie(`${ID}-testing-occurring`)) {
    logMessage("EXP SHOWN FROM URL PARAM")
    if (saveFifteenOfferExpired == false || saveTenOfferExpired == false) {
      setCookie(`${ID}-testing-occurring`, true);
      startExperiment();
    }

  } else {
    pollerLite([
      () => {
        return localStorage.getItem('ATPersObj');
      },
    ], () => {

      let atPersObj = JSON.parse(localStorage.getItem('ATPersObj'));
      logMessage(atPersObj);

      let experimentShown = false;
      let allCartUpdates = atPersObj.cartUpdates;
      let dateNowMidnight = new Date().setHours(0, 0, 0, 0);
      let date30DaysAgo = dateNow - (30 * 24 * 60 * 60 * 1000);

      let allATBLast30Days = allCartUpdates.filter((update) => {
        if (update.operation == "addToCart" && (update.timestamp > date30DaysAgo && update.timestamp < dateNow)) {
          return update;
        }
      });

      let sessionStampFromTodayFound = atPersObj.sessionStamps.filter((stamp) => {
        if (stamp > dateNowMidnight) {
          return stamp;
        }
      });
      let sessionStampsSinceLastATB;
      if (allATBLast30Days.length > 0) {
        sessionStampsSinceLastATB = atPersObj.sessionStamps.filter((stamp) => {
          let lastATB = allATBLast30Days[allATBLast30Days.length - 1].timestamp;
          console.log('experiment - sessionStampsSinceLastATB - lastATB', lastATB);
          console.log('experiment - sessionStampsSinceLastATB - stamp', lastATB);
          if (stamp > lastATB) {
            return stamp;
          }
        });
        console.log('experiment - sessionStampsSinceLastATB ', sessionStampsSinceLastATB);
      }

      logMessage("CartUpdates - found atc in last 30 days - Length: " + allATBLast30Days.length);
      logMessage("Transactions Length: " + atPersObj.transactions.length);
      logMessage("SessionStamps Length: " + atPersObj.sessionStamps.length);
      logMessage("SessionStampsFromToday Length: " + sessionStampFromTodayFound.length);
      logMessage("SessionStampsSinceLastATB Length: " + sessionStampsSinceLastATB.length);

      console.log('experiment - allATBLast30Days ', allATBLast30Days.length);
      console.log('experiment - transactions ', atPersObj.transactions.length);
      console.log('experiment - sessionStamps ', atPersObj.sessionStamps.length);
      //console.log('experiment - sessionStampsSinceLastATB ', sessionStampsSinceLastATB.length);

      if (allATBLast30Days.length > 0 && atPersObj.transactions.length == 0 && atPersObj.sessionStamps.length > 0 && sessionStampsSinceLastATB.length >= 1) {
        console.log('experiment shown');
        console.log('experiment - transactions', atPersObj.transactions.length);
        experimentShown = true;
      }

      if (experimentShown && (saveFifteenOfferExpired == false || saveTenOfferExpired == false)) {
        logMessage("EXP SHOWN FROM CONDITIONS");
        fireEvent('Conditions Met');
        if (VARIATION !== "control") {
          setCookie(`${ID}-user-qualifies`, true);
          startExperiment();
        }

      }



    });
  }


  document.body.addEventListener('click', (e) => {

    if ((e.target.classList.contains(`oct-iconButton`) || e.target.closest('.oct-iconButton')) && e.target.closest('#mobileLink_basket')) {
      fireEvent('Click - user has clicked on the basket icon to open it', true);

      if (VARIATION !== "control") {

        if ((saveTenOfferExpired == false || saveFifteenOfferExpired == false) && (getCookie(`${ID}-testing-occurring`) || getCookie(`${ID}-user-qualifies`))) {
          startBasketContent();
        }
      }


    }

    if ((e.target.classList.contains(`oct-notification__ctas_left`) || e.target.closest('.oct-notification__ctas_left')) && e.target.closest('#oct-notification-container')) {
      fireEvent('Click - user has clicked on the view basket in the notification to open it', true);

      if (VARIATION !== "control") {
        if ((saveTenOfferExpired == false || saveFifteenOfferExpired == false) && (getCookie(`${ID}-testing-occurring`) || getCookie(`${ID}-user-qualifies`))) {
          startBasketContent();
        }
      }

    }

  });


};
