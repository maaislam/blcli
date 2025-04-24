/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { countdown } from '../../../../../lib/uc-lib';

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

    
    const actualDate = document.getElementById('js-update-delivery');

    if(actualDate) {
  
      const today = new Date();
      const tempDate = new Date();
      let cutoffDate = tempDate.setHours(18,0,0,0);


      const deliveryDay = actualDate.innerText.replace(/(,)(\s).+/, '').trim();
      const deliveryNo = actualDate.innerText.trim().match(/[\d]{1,2}/)[0];
      const tomorrowNumber = new Date().getDate() +1;
      const dayAfterNo = new Date().getDate() +2;

      
      let tomorrow =  new Date();
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      tomorrow = tomorrow.setDate(today.getDate() + 1);
      var d = new Date(tomorrow);
      var tomorrowsDay = days[d.getDay()];

      const dayAfterTomorrow = new Date().setDate(today.getDate() + 2);
      const d2 = new Date(dayAfterTomorrow);
      const dayAfterDay = days[d2.getDay()];

  
      // MONDAY
      // after 6
      if(today.getDay() === 1 && today.getHours() >= 18) {
            cutoffDate = cutoffDate + (1 * 86400000); // add one day
      }
        
      // TUESDAY
      if(today.getDay() === 2 && today.getHours() >= 18){
        cutoffDate=cutoffDate + (1 * 86400000); // add one day
      }
        
        
      //WEDNESDAY
      // if wednesday before 6, set delivery to thursday
      if(today.getDay() === 3 && today.getHours() >= 18) {
        cutoffDate = cutoffDate + (1 * 86400000);
      }
        
      // THURSDAY
      // if day is thursday before 6, set delivery to friday
      if(today.getDay() === 4 && today.getHours() >= 18) {
        cutoffDate = cutoffDate + (1 * 86400000);
      }
        
      // If friday before 6pm, make it saturday
      if (today.getDay() === 5 && today.getHours() >= 18) {
        cutoffDate = cutoffDate + (1 * 86400000);
      }
    
      // Saturday, make the delivery on monday
      if(today.getDay() === 6) {
        cutoffDate = cutoffDate + (2 * 86400000);
      }
        
      // if sunday, delivery will be tuesday
      if(today.getDay() === 0) {
        cutoffDate = cutoffDate + (2 * 86400000);
      }
     
    
      // if the delivery on page is tomorrow or the delivery day says saturday, show the countdown
      // mon - fri

      if((deliveryDay === tomorrowsDay && deliveryNo == tomorrowNumber) 
      || (today.getDate() == 6 && deliveryDay == 'Monday' && deliveryNo === tomorrowNumber + 1) 
      || (today.getDate() == 7 && deliveryDay == 'Monday' && deliveryNo === tomorrowNumber) 
      || (today.getHours() >= 18 && deliveryDay === dayAfterDay && deliveryNo == dayAfterNo) 
      || (today.getHours() >= 18 && today.getDate() == 6 && deliveryDay == 'Tuesday' && deliveryNo === dayAfterNo +1)
      || (today.getHours() >= 12 && today.getDate() == 7 && deliveryDay == 'Tuesday' && deliveryNo === dayAfterNo)) {

        const countdownEl = document.createElement('p');
        countdownEl.classList.add(`${ID}__countdownText`);
        countdownEl.innerHTML = `Free Next Day delivery on <span class="${ID}__deliveryDay">${actualDate.innerText.replace(/(,)(\s).+/, '').trim()}</span> when you order in <span class="${ID}__countdown"></span>`;
    
        document.querySelector('.product-buy-now').insertAdjacentElement('afterend', countdownEl);

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

        const deliveryIsTomorrow = () => {
          if((deliveryDay === tomorrowsDay && deliveryNo == tomorrowNumber) 
          || (today.getDate() == 6 && deliveryDay == 'Monday' && deliveryNo === tomorrowNumber + 1) 
          || (today.getDate() == 7 && deliveryDay == 'Monday' && deliveryNo === tomorrowNumber) 
          || (today.getHours() >= 18 && deliveryDay === dayAfterDay && deliveryNo == dayAfterNo) 
          || (today.getHours() >= 18 && today.getDate() == 6 && deliveryDay == 'Tuesday' && deliveryNo === dayAfterNo +1)
          || (today.getHours() >= 12 && today.getDate() == 7 && deliveryDay == 'Tuesday' && deliveryNo === dayAfterNo)) {
           return true;
          } 
        }

        // On size change, hide/show based on if delivery day is tomorrow
        const options = document.querySelector('#js-sku-change');
        const countdownBlock = document.querySelector(`.${ID}__countdownText`);
        if (options) {
          options.addEventListener('change', () => {

            if (options.options[options.selectedIndex].text.indexOf('(Delivery in') > -1) {
              countdownBlock.style.display = 'none';

            } else {
              if (deliveryIsTomorrow() === true) {
                countdownBlock.style.display = 'block';
              } else {
                countdownBlock.style.display = 'none';
              }
            }
          });
        }

      }
    }
    
  } else {
    // any control code here
  }
};
