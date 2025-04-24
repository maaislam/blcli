/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {

  
    const countdown = () => {
      var countDownDate = new Date("Feb 13, 2023 18:59:59").getTime();

      // Run myfunc every second
      var myfunc = setInterval(function() {
        var now = new Date().getTime();
        var timeleft = countDownDate - now;
            
        // Calculating the days, hours, minutes and seconds left
        var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor(timeleft % (1000 * 60) / 1000); 

        const daysHTML = days.toString().replace(/(.)/g, `<span class="digit">$1</span>`);
        const hoursHtml = hours.toString().replace(/(.)/g, `<span class="digit">$1</span>`);
        const minsHtml = minutes.toString().replace(/(.)/g, `<span class="digit">$1</span>`);
        const secHtml = seconds.toString().replace(/(.)/g, `<span class="digit">$1</span>`);


        document.querySelector(`.${ID}-countdown`).innerHTML = 
        `<div class="timeBlock days">
          <div class="inner">
            ${days < 10 ? `<span class="digit">0</span>` : ''}
            ${daysHTML}
          </div>
          <span class="label">Days</span>
        </div>
        <div class="timeBlock hours">
          <div class="inner">
            ${hours < 10 ? `<span class="digit">0</span>` : ''}
            ${hoursHtml}
          </div>
          <span class="label">Hours</span>
        </div>
        <div class="timeBlock minutes">
          <div class="inner">
            ${minutes < 10 ? `<span class="digit">0</span>` : ''}
            ${minsHtml}
          </div>
          <span class="label">Minutes</span>
        </div>
        <div class="timeBlock seconds">
          <div class="inner">
            ${seconds < 10 ? `<span class="digit">0</span>` : ''}
            ${secHtml}
          </div>
          <span class="label">Seconds</span>
        </div>`;


        if (timeleft < 0) {
            clearInterval(myfunc);
            document.querySelector(`.${ID}-deliveryCountdown`).remove();
        }
      }, 500);
    }

    const addBanner = () => {
      const deliveryBanner = `
      <div class="${ID}-deliveryCountdown">
        <div class="${ID}-container">
          <div class="${ID}-countdown-text">
            <p><strong>Express delivery for Valentine's Day</strong><em> ends in...</em></p>
          </div>
          <div class="${ID}-countdown"></div>
        </div>
      </div>`;

      countdown();
  
      document.querySelector('.header').insertAdjacentHTML('afterend', deliveryBanner);
    }
    
    addBanner();
    
    
  } else {
    // any control code here
  }
};
