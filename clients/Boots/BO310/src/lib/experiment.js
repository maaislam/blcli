/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { getCookie, logMessage, pollerLite, setCookie } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const initializeClock = (id, endtime) => {
  const clock = document.getElementById(id);
  //const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    //daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

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


const startExperiment = (offerCode) => {

  

  let offerOverlayHTML = `

    <div class="${ID}-overlay">

      <div class="${ID}-offer">

        <h2>Your Secret Offer</h2>
      
        <p> Get <span class="${ID}-boldtext">10% off</span> your basket with the code below</p>

        <div class="${ID}-offer--code" id="${ID}-offer--code" data-code="${offerCode}">${offerCode}<button class="${ID}-copy" id="${ID}-copy"><svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#05054B"/></svg></button></div>

        <p class="${ID}-secondary"> Valid on baskets over £40. <a target="_blank" href="https://www.boots.com/information/terms-conditions" id="${ID}-tsandcs">T&Cs apply</a></p>

        <div class="${ID}-offer--countdown">

          <p class="${ID}-secondary"> Hurry, only </p>

          <div id="${ID}-clockdiv" class="${ID}-clockdiv">
            <div>
              <span class="hours"></span>
              <div class="smalltext hours">Hours</div>
            </div>
            <div>
              <span class="minutes"></span>
              <div class="smalltext mins">Mins</div>
            </div>
            <div class="${ID}-seconds">
              <span class="seconds"></span>
              <div class="smalltext secs">Secs</div>
            </div>
          </div>

          <p class="${ID}-secondary"> left to claim this offer! </p>

        </div>

      </div>

      <div class="${ID}-cta">
      
        <button id="${ID}-applybutton" class="${ID}-button">Apply Code</button>
      
      </div>

      <button class="${ID}-close" id="${ID}-close"><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M16.5 16.5L0.5 0.5M16.5 0.5L0.5 16.5" stroke="#05054B" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      ${VARIATION == 1 ? `<button class="${ID}-minimize" id="${ID}-minimize"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12" stroke="#05054B" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg></button>` : ``}

    </div>

  `;

  let insertionPoint = document.body;

  fireEvent(`Conditions Met`, true);

  if (VARIATION == "control") {
    return;
  }


  insertionPoint.insertAdjacentHTML('beforeend', offerOverlayHTML);
  

  document.documentElement.classList.add(`${ID}-noscroll`);

  
  if (localStorage.getItem(`${ID}-offer--code`) && localStorage.getItem(`${ID}-offer--endDate`) < new Date().getTime()) {

    // Countdown Clock

    const deadline = new Date(localStorage.getItem(`${ID}-offer--endDate`));
    initializeClock(`${ID}-clockdiv`, deadline);

    if(new Date().getTime() > deadline.getTime()) {
      setCookie(`${ID}-closed-popup`, 'true', 1);
      document.querySelector(`.${ID}-overlay`).remove();
    }

  } else {

    // Countdown Clock

    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 24);
    deadline.setSeconds(deadline.getSeconds() - 1);
    initializeClock(`${ID}-clockdiv`, deadline);

    // Local Storage
    localStorage.setItem(`${ID}-offer--code`, offerCode);
    localStorage.setItem(`${ID}-offer--endDate`, deadline);

  }

  


  // Event Listeners

  document.getElementById(`${ID}-minimize`)?.addEventListener('click', () => {
    document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-hidden`);
    document.documentElement.classList.remove(`${ID}-noscroll`);


    addSidePanel();

    fireEvent(`Click - user clicked the close X to ${VARIATION == 1 ? `minimize the offer` : `hide the offer completely and not see it again`}`, true);
  });

  document.getElementById(`${ID}-close`).addEventListener('click', () => { 
    document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-hidden`);
    document.documentElement.classList.remove(`${ID}-noscroll`);

    
    setCookie(`${ID}-closed-popup`, 'true', 1);
    
    //   addSidePanel();
    // }
    
    fireEvent(`Click - user clicked the close X to ${VARIATION == 1 ? `minimize the offer` : `hide the offer completely and not see it again`}`, true);
  });

  document.getElementById(`${ID}-copy`).addEventListener('click', () => {
    let offerCodeElement = document.getElementById(`${ID}-offer--code`);
    let copyText = offerCodeElement.dataset.code;
    offerCodeElement.classList.add(`${ID}-copied`);
    setTimeout(() => {
      offerCodeElement.classList.remove(`${ID}-copied`);
    }, 2000);
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);
    fireEvent(`Click - user clicked the copy button to copy the offer code`, true);
  });

  document.documentElement.addEventListener('click', (e) => {

    if(e.target.classList.contains(`${ID}-noscroll`) && !e.target.closest(`.${ID}-overlay`)) {
      document.querySelector(`.${ID}-overlay`).remove();
      document.documentElement.classList.remove(`${ID}-noscroll`);      
      fireEvent(`Click - user clicked outwith the modal to dismiss the offer`, true);
    }

  });

  

  document.getElementById(`${ID}-tsandcs`).addEventListener('click', () => {
    fireEvent(`Click - user clicked the T&Cs link`, true);
  });

  document.getElementById(`${ID}-applybutton`).addEventListener('click', () => {
    let currDisplayedCode = document.getElementById(`${ID}-offer--code`).dataset.code;
    setCookie('_uqd_param', currDisplayedCode);
    setCookie(`${ID}-applied-code`, true);
    document.querySelector(`.${ID}-cta`).remove();
    document.querySelector(`.${ID}-offer`).innerHTML = `<h2>Thank you!</h2><p>Your code has been copied to basket and the page will now reload. Your offer code will be auto-applied once you open the basket. </p>`;
    setCookie(`${ID}-closed-popup`, 'true', 1);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
    fireEvent(`Click - user clicked the Apply button with code: ${currDisplayedCode}`, true);
  });

}

const callUniqodoAPIStartExperiment = () => {

  

  if(localStorage.getItem(`${ID}-offer--code`) && localStorage.getItem(`${ID}-offer--endDate`) < new Date().getTime()) {

    startExperiment(localStorage.getItem(`${ID}-offer--code`));


  } else {

    //write a fetch function to query an API
    fetch('https://api.uniqodo.com/code/396ef7df2b40d3a7a0b9b8645a8d994d67a7dfb2/25214', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(returnedData => {
      logMessage(returnedData);
      let offerCode = returnedData.data.code;
      let endDate = returnedData.data.endDate;
      startExperiment(offerCode, endDate);
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

const addSidePanel = () => {

  let sidePanelHTML = `<button class="${ID}-sidepanel" id="${ID}-sidepanel">Secret Offer</button>`;

  document.body.insertAdjacentHTML('beforeend', sidePanelHTML);

  document.getElementById(`${ID}-sidepanel`).addEventListener('click', () => {

    fireEvent(`Click - user clicked the side panel button`, true);
    document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-hidden`);
    document.documentElement.classList.add(`${ID}-noscroll`);
    document.getElementById(`${ID}-sidepanel`).remove();

  });


}

const checkAndApplyCode = () => {
  if (getCookie(`${ID}-applied-code`) == "true") {
    pollerLite(['.oct-offer-code__button'], () => {
      setTimeout(() => {
        document.querySelector('.oct-offer-code__button').click();
        fireEvent(`Click - code was auto-applied`, true);
        setCookie(`${ID}-applied-code`, false);
      }, 500);
    });
  }
}

export default () => {

  setup();

  

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  if (window.location.href.indexOf('bo310testing=true') > -1) {
    logMessage("EXP SHOWN FROM URL PARAM")
    callUniqodoAPIStartExperiment();
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
      let dateNow = new Date().getTime();
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

      let sessionStampsSinceLastATB = atPersObj.sessionStamps.filter((stamp) => {
        let lastATB = allATBLast30Days[allATBLast30Days.length - 1].timestamp;
        if (stamp > lastATB) {
          return stamp;
        }
      });
      
      logMessage("CartUpdates - found atc in last 30 days - Length: " + allATBLast30Days.length);
      logMessage("Transactions Length: " + atPersObj.transactions.length);
      logMessage("SessionStamps Length: " + atPersObj.sessionStamps.length);
      logMessage("SessionStampsFromToday Length: " + sessionStampFromTodayFound.length);
      logMessage("SessionStampsSinceLastATB Length: " + sessionStampsSinceLastATB.length);

      if (allATBLast30Days.length > 0 && atPersObj.transactions.length == 0 && atPersObj.sessionStamps.length > 0 && sessionStampsSinceLastATB.length >= 1) {
        experimentShown = true;
      }

      if (!getCookie(`${ID}-closed-popup`) && experimentShown) {
        logMessage("EXP SHOWN FROM CONDITIONS");
        callUniqodoAPIStartExperiment();
      }



    });
  }

  document.body.addEventListener('click', (e) => {

    if (e.target.classList.contains(`oct-iconButton`) || e.target.closest('.oct-iconButton')) {
      checkAndApplyCode();
    }

    if ((e.target.classList.contains(`.oct-notification__ctas_left`) || e.target.closest('.oct-notification__ctas_left')) && e.target.closest('#oct-notification-container')) {
      checkAndApplyCode();
    }

  });

  

  

  

};
